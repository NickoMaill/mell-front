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
import ModalProvider from './components/layout/ModalProvider';
import AppContext from './context/appContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/resources/i18n/i18n';
import SearchContext, { SearchField, SortField } from './context/searchContext';
import SessionContext from './context/sessionContext';
import { UserAccessLevel } from './models/users';
import configManager from './managers/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function App() {
    // #region STATE --> ///////////////////////////////////////
    const [lang, setLang] = useState<LangType>('fr');
    const [name, setName] = useState<string>(null);
    const [id, setId] = useState<string>(null);
    const [email, setEmail] = useState<string>(null);
    const [mobile, setMobile] = useState<string>(null);
    const [ip, setIp] = useState<string>(null);
    const [level, setLevel] = useState<UserAccessLevel>(UserAccessLevel.VISITOR);
    const [token, setToken] = useState<string>(null);
    const [tokenExpire, setTokenExpire] = useState<Date>(new Date(Date.now()));
    const sessionValue = {
        name,
        setName,
        id,
        setId,
        email,
        setEmail,
        mobile,
        setMobile,
        level,
        setLevel,
        ip,
        setIp,
        lang,
        setLang,
        token,
        setToken,
        tokenExpire,
        setTokenExpire,
    };
    // #endregion /////////////////////////////////////////////

    // #region SearchContext //////////////////////////////////
    const [filters, setFilters] = useState<SearchField[]>(null);
    const [sortedBy, setSortedBy] = useState<SortField>(null);
    const searchValue = {
        filters,
        setFilters,
        sortedBy,
        setSortedBy,
    };

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
        // setLang(Storage.isItemExist('lang') ? (Storage.getItem('lang') as LangType) : 'fr');
        console.log(configManager.getConfig);
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <I18nextProvider i18n={i18n}>
            <SessionContext.Provider value={sessionValue}>
                <SearchContext.Provider value={searchValue}>
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
                </SearchContext.Provider>
            </SessionContext.Provider>
        </I18nextProvider>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
