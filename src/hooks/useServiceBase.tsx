// #region IMPORTS -> /////////////////////////////////////
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { ApiErrorType } from '~/core/types/ApiError';
import { ResultStatusEnum } from '~/core/types/serverCoreType';
import useModal from './useModal';
import useService from './useService';
import { useContext } from 'react';
import SessionContext from '~/context/sessionContext';
import configManager from '~/managers/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useServiceBase(): IUseServiceBase {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Modal = useModal();
    const Service = useService();
    const Session = useContext(SessionContext);
    // const SessionService = useSessionService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    /**
     * @description hooks that handle error and dispatch an AppError
     * @param request
     * @returns
     */
    const asServicePromise = async <T,>(request: Promise<T>) => {
        if (!gotSession()) await refreshSession();
        return await request.then(
            (apiResponse) => Promise.resolve<T>(apiResponse),
            (error) => reject<T>(error as unknown)
        );
    };
    /**
     * @description hooks that reject a promise fetch call
     * @param error
     * @returns
     */
    const reject = <TResult,>(error): Promise<TResult> => {
        if (error && error.type) return Promise.reject(error);

        if (!error.status) return Promise.reject(new AppError(ErrorTypeEnum.Undefined, error.message, fetchDispatcher(error.message)));

        let type = ErrorTypeEnum.Undefined;

        switch (error.status) {
            case ResultStatusEnum.Forbidden:
                type = ErrorTypeEnum.NotAllowed;
                break;
            case ResultStatusEnum.UnAuthorized:
                type = ErrorTypeEnum.SessionRequired;
                break;
            case ResultStatusEnum.NotAcceptable:
                type = ErrorTypeEnum.Maintenance;
                break;
            case ResultStatusEnum.BadRequest || ResultStatusEnum.Fatal || ResultStatusEnum.NotFound:
                type = ErrorTypeEnum.Technical;
                break;
            default:
                type = ErrorTypeEnum.Undefined;
                break;
        }

        const apiError = error.result as ApiErrorType;
        console.error('error', error);
        return Promise.reject(new AppError(type, apiError.message, apiError.code, apiError.data));
    };
    /**
     * @description method that return a fetch message error 
     * @param {string} str
     * @returns fetch error message
     */
    const fetchDispatcher = (str: string): string => {
        switch (str) {
            case 'Failed to fetch':
                return 'failed_request';
            case 'cancelled':
                return 'cancelled';
            case 'NetworkError when attempting to fetch resource':
                return 'network_error';
            case 'Response has unsupported MIME type':
                return 'unsupported_mime';
            case "Failed to execute 'json' on 'Response': body stream is locked":
                return 'reader_error';
            case 'has been blocked by CORS policy':
                return 'cors_error';
            default:
                return 'unknow_error';
        }
    };
    /**
     * 
     * @returns boolean true if got session or false if got no session
     */
    const refreshSession = async (): Promise<boolean> => {
        if (!gotSession()) {
            const request = await Service.get<{ access: string; expires: string } | ApiErrorType>('login/refresh');
            if ((request as ApiErrorType).code) {
                switch ((request as ApiErrorType).code) {
                    case 'no_session':
                    case 'session_expired':
                        window.location.href = configManager.getConfig.API_BASEURL + "/" + "login"
                        throw new AppError(ErrorTypeEnum.Technical, 'got no session or expired session', 'no_session');    
                    case 'need_mfa':
                        window.location.href = configManager.getConfig.API_BASEURL + "/" + "login/mfa"
                        throw new AppError(ErrorTypeEnum.Technical, 'need to re-auth mfa', 'need_mfa');
                    default:
                        throw new AppError(ErrorTypeEnum.Technical, 'an Error happened', 'error_happened');
                }
            }
            const response = request as { access: string; expires: string };
            Session.setToken(response.access);
            Session.setTokenExpire(new Date(response.expires));
        }
        return true;
    };

    const gotSession = (): boolean => {
        console.log( "expires", Session.tokenExpire);
        if (!window.location.pathname.startsWith("/admin")) {
            return true;
        } else if (Session.token && Session.token !== '' && (Session.tokenExpire ?? new Date(Date.now())).getTime() > Date.now()) {
            return true;
        }
        return false;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { asServicePromise };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseServiceBase {
    asServicePromise: <T>(request: Promise<T>) => Promise<T>;
}
// #endregion IPROPS --> //////////////////////////////////
