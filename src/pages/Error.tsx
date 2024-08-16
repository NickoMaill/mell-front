// #region IMPORTS -> /////////////////////////////////////
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ErrorPic from '~/assets/pictures/500.png';
import { Bold, Regular } from '~/components/common/Text';
import Layout from '~/components/Layout/Layout';
import AppContext from '~/context/appContext';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Error({}: IError) {
    // #region STATE --> ///////////////////////////////////////
    const [goBack, setGoBack] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Nav = useNavigation();
    const AppCtx = useContext(AppContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const resetError = () => {
        if (Nav.currentRoute.name === 'Home') {
            window.location.reload();
        } else {
            window.history.back();
            setGoBack(true);
            setWait(true);
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (goBack) {
            setTimeout(() => {
                window.location.reload();
                setGoBack(false);
            }, 1000);
        }
    }, [goBack]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Layout primaryBg error>
            <Box sx={{ height: '80vh' }} className="d-flex justify-content-center align-items-center flex-column py-3 h-100">
                <Box sx={{ textAlign: 'center', marginBottom: 3, marginTop: 2 }}>
                    <Typography color="white" fontWeight={'bold'} variant="h3" component={'h2'}>
                        {AppCtx.error.code === 'failed_request' ? '503' : '500'}
                    </Typography>
                    <Typography color="white" fontWeight={'bold'} variant="h5">
                        Ça c'est un gros nœud!
                    </Typography>
                    <Typography color="white" fontWeight={'bold'}>
                        Nous avons rencontré une erreur inattendue.
                        {AppCtx.error.code === 'failed_request' ? (
                            <>
                                <br />
                                Le serveur est injoignable pour le moment.
                                <br />
                            </>
                        ) : (
                            <>Nos développeurs sont en train de défaire ce nœud.</>
                        )}
                    </Typography>
                    <Typography color="white" fontWeight={'bold'}>
                        Veuillez revenir plus tard.
                    </Typography>
                    <Button onClick={resetError} variant="outlined" sx={{ color: 'white', borderColor: 'white', marginBlock: 3 }}>
                        Retour
                    </Button>
                    {wait && (
                        <>
                            <Bold color="white">Redirection en cours</Bold>
                            <CircularProgress sx={{ marginTop: 2, color: 'white' }} />
                        </>
                    )}
                </Box>
                <img src={ErrorPic} width={'15%'} onDragStart={() => false} />
            </Box>
        </Layout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IError {}
// #enderegion IPROPS --> //////////////////////////////////
