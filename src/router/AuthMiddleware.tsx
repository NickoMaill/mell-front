// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useContext, useEffect, useState } from 'react';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AuthMiddleware({ children }: IAuthMiddleware) {
    // #region STATE --> ///////////////////////////////////////
    // const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Navigation = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getAuth = async () => {};
    // #endregion METHODS --> //////////////////////////////////
    // #region USEEFFECT --> ///////////////////////////////////

    useEffect(() => {
        getAuth();
    }, [Navigation.location]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    if (isLoading) {
        // return <AppFullPageLoader isLoading />;
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
