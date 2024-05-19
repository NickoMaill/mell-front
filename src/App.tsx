// #region IMPORTS -> /////////////////////////////////////
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import stylesResources from './resources/stylesResources';
import AppRouter from './router/AppRouter';
import '~/resources/i18n/i18n';
import './styles/global.scss';
import './styles/web.scss';
import 'animate.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useStorage from './hooks/useStorage';
import { LangType } from './core/types/i18nTypes';
import { SnackbarProvider } from 'notistack';
import ModalProvider from './components/Layout/ModalProvider';
import AppContext from './context/appContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/resources/i18n/i18n';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function App() {
    // #region STATE --> ///////////////////////////////////////
    const [lang, setLang] = useState<LangType>('fr');
    const [isNoAccess, setIsNoAccess] = useState<boolean>(false);
    const appValue = {
        isNoAccess,
        setIsNoAccess,
    };
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Storage = useStorage();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    moment.locale('fr');
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        setLang(Storage.isItemExist('lang') ? (Storage.getItem('lang') as LangType) : 'fr');
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <I18nextProvider i18n={i18n}>
            <AppContext.Provider value={appValue}>
                <ModalProvider>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={stylesResources.theme}>
                            <CssBaseline />
                            <SnackbarProvider>
                                <AppRouter />
                            </SnackbarProvider>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </ModalProvider>
            </AppContext.Provider>
        </I18nextProvider>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
