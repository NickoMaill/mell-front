// #region IMPORTS -> /////////////////////////////////////
import { Box, Button } from '@mui/material';
import { ReactNode, useContext, useEffect } from 'react';
import AppCard from '../common/AppCard';
import { Bold, Regular } from '../common/Text';
import { Link } from 'react-router-dom';
import AppContext from '~/context/appContext';
import useNavigation from '~/hooks/useNavigation';
import { Trans } from 'react-i18next';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function NoAccessLayout({ children }: INoAccessLayout) {
    // #region STATE --> ///////////////////////////////////////
    const App = useContext(AppContext);
    const Navigation = useNavigation();
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (App.isNoAccess) {
            App.setIsNoAccess(false);
        }
    }, [Navigation.location]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {App.isNoAccess ? (
                <Box className="d-flex align-items-center flex-column">
                    <AppCard title="Accès Refusé" className="w-100" icon="Lock">
                        <Bold>
                            <Trans i18nKey="error.noAccess.intro" />
                        </Bold>
                        <br />
                        <Regular>
                            <Trans i18nKey="error.noAccess.please" />
                        </Regular>
                        <br />
                        <Regular>
                            <Trans i18nKey="error.noAccess.expired" />
                        </Regular>
                        <Regular>
                            <Trans components={{ link: <Link to="/login" /> }} i18nKey="error.noAccess.login" />
                        </Regular>
                    </AppCard>
                    <Button onClick={() => Navigation.goBack()} sx={{ width: 'fit-content' }} variant="contained" color="secondary">
                        Retour
                    </Button>
                </Box>
            ) : (
                children
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface INoAccessLayout {
    children: ReactNode;
}
// #enderegion IPROPS --> //////////////////////////////////
