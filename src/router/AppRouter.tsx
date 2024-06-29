// #region IMPORTS -> /////////////////////////////////////
import { Route, Routes } from 'react-router-dom';
import navigationResources from '~/resources/navigationResources';
import AuthMiddleware from './AuthMiddleware';
import Layout from '~/components/layout/Layout';
import NotFound from '~/pages/ NotFound';
import Error from '~/pages/Error';
import ErrorBoundary from '~/components/layout/ErrorBoundary';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppRouter() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <ErrorBoundary>
            <Routes>
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
                <Route
                    path="*"
                    element={
                        <Layout primaryBg>
                            <NotFound />
                        </Layout>
                    }
                />
            </Routes>
        </ErrorBoundary>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
