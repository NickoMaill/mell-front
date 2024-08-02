// #region IMPORTS -> /////////////////////////////////////
import React, { ReactNode, useContext, useEffect } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import AppContext from '~/context/appContext';
import Error from '~/pages/Error';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function ErrorBoundary({ children }: IErrorBoundary) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const AppCtx = useContext(AppContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <ReactErrorBoundary fallback={<Error />} onReset={() => AppCtx.setError(null)}>
            <ErrorHandler>{children}</ErrorHandler>
        </ReactErrorBoundary>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

function ErrorHandler({ children }) {
    const AppCtx = useContext(AppContext);
    useEffect(() => {
        if (AppCtx.error) {
            throw AppCtx.error;
        }
    }, [AppCtx.error]);

    return children;
}

// #region IPROPS -->  /////////////////////////////////////
interface IErrorBoundary {
    children: ReactNode;
}
// #enderegion IPROPS --> //////////////////////////////////
