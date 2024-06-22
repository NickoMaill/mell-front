// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useEffect, useState } from 'react';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import useAuthSession from '~/hooks/useAuthSession';
import useNavigation from '~/hooks/useNavigation';
import configManager from '~/managers/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AuthMiddleware({ children }: IAuthMiddleware) {
    // #region STATE --> ///////////////////////////////////////
    // const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Navigation = useNavigation();
    const Auth = useAuthSession();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getAuth = async () => {
            await Auth.checkSession().then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                // window.location.href = configManager.getConfig.API_BASEURL + "/login";
            })
    };
    // #endregion METHODS --> //////////////////////////////////
    // #region USEEFFECT --> ///////////////////////////////////

    useEffect(() => {
        getAuth();
        console.log('auht');
    }, [Navigation.location]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    if (isLoading) {
        return <AppFullPageLoader isLoading />;
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
