// #region IMPORTS -> /////////////////////////////////////
import { useContext } from 'react';
import useService from '~/hooks/useService';
import SessionContext from '~/context/sessionContext';
import useServiceBase from './useServiceBase';
import { ApiErrorType } from '~/core/types/ApiError';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import useNavigation from './useNavigation';
import { User, UserAccessLevel } from '~/models/users';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useSessionService(): IUseSessionService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    const { asServicePromise } = useServiceBase();
    const Context = useContext(SessionContext);
    const Navigation = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const login = async (form: FormData): Promise<boolean> => {
        try {
            const request = await Service.post<User | AppError, any>('login', null, form);
            const session = request as User;
            setSessionContext(session);
            return true;
        } catch (error) {
            if ((error as AppError).code) {
                switch ((error as AppError).code) {
                    case 'not_found':
                        throw new AppError(ErrorTypeEnum.Functional, 'email ou mot de passe invalide', 'invalid_credentials');
                    case 'invalid_credentials':
                        throw new AppError(ErrorTypeEnum.Functional, 'email ou mot de passe invalide', 'invalid_credentials');
                    case 'email_required':
                        throw new AppError(ErrorTypeEnum.Functional, "L'email est requis", 'email_required');
                    case 'need_mfa':
                        return true;
                    case 'password_required':
                        throw new AppError(ErrorTypeEnum.Functional, 'Le mot de passe requis', 'password_required');
                    default:
                        throw new AppError(ErrorTypeEnum.Functional, 'une erreur est survenue', 'error_happened');
                }
            } else if ((error as any).errors) {
                const errors = (error as any).errors;
                if (errors.Password) {
                    throw new AppError(ErrorTypeEnum.Functional, 'Le mot de passe requis', 'email_required');
                }
                if (errors.UserName) {
                    throw new AppError(ErrorTypeEnum.Functional, "L'email est requis", 'email_required');
                }
            }
        }
    };

    const loginOpt = async (form: FormData) => {
        try {
            const request = await asServicePromise<User | ApiErrorType>(Service.post('login/mfa', null, form));
            const session = request as User;
            setSessionContext(session);
            return true;
        } catch (error) {
            if ((error as AppError).code) {
                switch ((error as AppError).code) {
                    case 'no_otp':
                    case 'invalid_otp':
                        return false;
                    case 'no_session':
                    case 'session_expired':
                        throw new AppError(ErrorTypeEnum.Functional, 'Session expirée', 'session_expired');
                    case 'expired_otp':
                        throw new AppError(ErrorTypeEnum.Functional, 'Session expirée', 'expired_otp');
                    default:
                        return false;
                }
            }
        }
    };

    const logout = async () => {
        await asServicePromise<{ success: boolean }>(Service.post('login/logout')).then((res) => {
            if (res.success) {
                setSessionContext();
                Navigation.navigate('Login');
            }
        });
    };

    const refreshSession = async (): Promise<boolean> => {
        try {
            if (!gotSession()) {
                const request = await Service.get<{ access: string; expires: string } | ApiErrorType>('login/refresh');
                const response = request as { access: string; expires: string };
                Context.setToken(response.access);
                Context.setTokenExpire(new Date(response.expires));
                return true;
            }
        } catch (error) {
            if ((error as AppError).code) {
                switch ((error as AppError).code) {
                    // case 'need_mfa':
                    //     throw new AppError(ErrorTypeEnum.Functional, 'Double authentification requise', 'need_mfa');
                    case 'no_session':
                    case 'session_expired':
                    default:
                        setSessionContext(null);
                        return false;
                }
            }
            throw new AppError(ErrorTypeEnum.Functional, 'une erreur est survenue', 'error_happened');
        }
        return true;
    };

    const gotSession = (): boolean => {
        if (Context.token && Context.token !== '' && Context.tokenExpire.getTime() > Date.now()) {
            return true;
        }
        return false;
    };

    // const requestOtp = async (): Promise<boolean> => {
    //     try {
    //         await asServicePromise<void | ApiErrorType>(Service.get('login/resendOtp'));
    //         return true;
    //     } catch (error) {
    //         if ((error as ApiErrorType).code) {
    //             switch ((error as ApiErrorType).code) {
    //                 case 'no_session':
    //                     return false;
    //                 case 'already_send':
    //                     throw new AppError(ErrorTypeEnum.Functional, 'otp déjà envoyé', 'already_send');
    //                 default:
    //                     throw new AppError(ErrorTypeEnum.Technical, 'an Error happened', 'error_happened');
    //             }
    //         }
    //     }
    // };

    const setSessionContext = (session?: User) => {
        if (session) {
            Context.setName(session.name);
            Context.setEmail(session.email);
            Context.setLevel(session.userLevel);
            Context.setToken(session.token);
            Context.setMobile(session.mobile);
        } else {
            Context.setName(null);
            Context.setEmail(null);
            Context.setLevel(UserAccessLevel.VISITOR);
            Context.setToken(null);
            Context.setMobile(null);
        }
    };

    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    const out: IUseSessionService = {
        login,
        loginOpt,
        refreshSession,
        // requestOtp,
        logout,
        gotSession,
    };

    return out;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseSessionService {
    login: (form: FormData) => Promise<boolean>;
    loginOpt: (form: FormData) => Promise<boolean>;
    refreshSession: () => Promise<boolean>;
    // requestOtp: () => Promise<boolean>;
    logout: () => Promise<void>;
    gotSession: () => boolean;
}
// #endregion IPROPS --> //////////////////////////////////
