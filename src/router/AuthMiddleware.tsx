// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useContext, useEffect, useState } from 'react';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import useSessionService from '~/hooks/useSessionService';
import useNavigation from '~/hooks/useNavigation';
import { AppError } from '~/core/appError';
import SessionContext from '~/context/sessionContext';
import { useNavigate } from 'react-router-dom';
import configManager from '~/managers/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AuthMiddleware({ children }: IAuthMiddleware) {
    // #region STATE --> ///////////////////////////////////////
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Navigation = useNavigation();
    const SessionService = useSessionService();
    const Session = useContext(SessionContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getAuth = async () => {
        try {
            const auth = await SessionService.refreshSession().catch((err: AppError) => {
                if (err.code === 'no_session' || err.code === 'session_expired') {
                    Navigation.navigate('Login', `?target=${window.location.href}`);
                    // window.location.href = configManager.getConfig.APP_BASEURL + "/admin/login"
                }
            });
            if (!auth) {
                Session.setToken(null);
                Navigation.navigate('Login', `?target=${window.location.pathname}`);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            Session.setToken(null);
            Navigation.navigate('Login', `?target=${window.location.href}`);
            // window.location.href = configManager.getConfig.APP_BASEURL + "/admin/login"
        }
    };
    // #endregion METHODS --> //////////////////////////////////
    // #region USEEFFECT --> ///////////////////////////////////

    useEffect(() => {
        getAuth();
    }, [Navigation.location]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    if (isLoading) {
        return <></>;
    } else {
        return children;
    }
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAuthMiddleware {
    children: ReactNode;
}
// #endregion IPROPS --> //////////////////////////////////
