// #region IMPORTS -> /////////////////////////////////////
import React, { useContext } from 'react';
import useService from './useService';
import useServiceBase from './useServiceBase';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import SessionContext from '~/context/sessionContext';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useAuthSession(): IUseAuthSession {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const service = useService();
    const serviceBase = useServiceBase();
    const Session = useContext(SessionContext)
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const checkSession = async () => {
        await service.get<{ token: string; expires: number }>('login/refresh').then((res) => {
            if (res.token) {
                Session.setToken(res.token);
                Session.setTokenExpire(new Date(res.expires));
            } else {
                throw new AppError(ErrorTypeEnum.SessionRequired, "unable to req");
            }
        });
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { checkSession };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseAuthSession {
    checkSession: () => Promise<void>;
}
// #enderegion IPROPS --> //////////////////////////////////
