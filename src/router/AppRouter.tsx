// #region IMPORTS -> /////////////////////////////////////
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import navigationResources from '~/resources/navigationResources';
import AuthMiddleware from './AuthMiddleware';
import Layout from '~/components/Layout/Layout';
import { useEffect } from 'react';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppRouter() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {navigationResources.routes.map((route, i) => {
                    return (
                        <Route
                            key={i}
                            path={route.path}
                            index={route.name === 'Home' ? true : false}
                            element={
                                route.isAuthRequired ? (
                                    <AuthMiddleware>
                                        <Layout>
                                            <route.element />
                                        </Layout>
                                    </AuthMiddleware>
                                ) : (
                                    <Layout>
                                        <route.element />
                                    </Layout>
                                )
                            }
                        />
                    );
                })}
                <Route path="*" element={<p>Aucune page trouvée</p>} />
            </Route>
        )
    );
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // const getAuth = async () => {
    //     const auth = await SessionService.refreshSession();
    //     if (!auth) {
    //         Session.setToken(null);
    //         window.location.href = 'login';
    //     } else {
    //         return;
    //     }
    // };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <RouterProvider router={router} />;
    // #endregion RENDER --> ///////////////////////////////////
}

// function CustomRoute({ path, element, index = false }: ICustomRouter) {
//     return <Route path={path} index={index} element={<Layout>{element}</Layout>} />;
// }

// #region IPROPS -->  /////////////////////////////////////
// interface IAppRouter {}
// interface ICustomRouter {
//     path: string;
//     element: ReactNode;
//     index?: boolean;
// }
// #endregion IPROPS --> //////////////////////////////////
