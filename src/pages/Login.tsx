// #region IMPORTS -> /////////////////////////////////////
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
//import useSessionService from '~/hooks/services/useSessionService';
import useNavigation from '~/hooks/useNavigation';
import { AppError } from '~/core/appError';
import { useContext, useEffect, useState } from 'react';
import { Box, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AppAlert from '~/components/common/AppAlert';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import useResources from '~/hooks/useResources';
import { Bold, Regular } from '~/components/common/Text';
import { useSearchParams } from 'react-router-dom';
//import SessionContext from '~/context/sessionContext';
import Logo from '~/assets/pictures/winch.png';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Login() {
    // #region STATE --> ///////////////////////////////////////
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>(null);
    const [resetMode, setResetMode] = useState<boolean>(false);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    //  const SessionService = useSessionService();
    const Navigation = useNavigation();
    //const Ses = useContext(SessionContext);
    const Resources = useResources();
    const [params] = useSearchParams();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const hideAlert = () => {
        setShowAlert(false);
    };
    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('connect');
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (params.get('mode') === 'reset') {
            setResetMode(true);
            setIsPageLoading(false);
        } else {
            // SessionService.refreshSession()
            //     .then((res) => {
            //         if (res) {
            //             Navigation.navigate('Home');
            //         }
            //     })
            //     .catch((err: AppError) => {
            //         console.error(err);
            //     })
            //     .finally(() => setIsPageLoading(false));
        }
    }, []);

    // useEffect(() => {
    //     if (resetMode) {
    //         setTitle(Resources.translate('login.resetTitle'));
    //     } else {
    //         setTitle(Resources.translate('common.welcome'));
    //     }
    // }, [resetMode]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {isPageLoading ? (
                <AppFullPageLoader isLoading counting />
            ) : (
                <Container sx={{ display: 'flex', justifyContent: 'center' }} maxWidth={'lg'}>
                    <Box maxWidth={'400px'} sx={{ marginTop: { xs: 1, md: 8, sm: 3 } }}>
                        <Box display="flex" alignItems="end" justifyContent="start" marginBottom={2}>
                            <Box component="img" sx={{ height: { xs: 60, sm: 80 }, width: { xs: 80, sm: 100 }, marginRight: 2 }} src={Logo} />
                            <Bold component="h1" variant="h4" color="secondary">
                                {title}
                            </Bold>
                            {isLoading && <CircularProgress sx={{ marginLeft: 2 }} />}
                        </Box>
                        {resetMode ? <ResetForm /> : <LoginForm isError={isError} showError={showAlert} onCloseAlert={hideAlert} messageError={messageError} onSubmit={handleSubmitLogin} isLoading={isLoading} />}
                    </Box>
                </Container>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////

function LoginForm({ isError, onSubmit, isLoading, messageError, showError, onCloseAlert }: ILoginForm) {
    const Resources = useResources();
    return (
        <>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    required
                    InputProps={{ startAdornment: <EmailIcon color="secondary" sx={{ marginRight: 1 }} /> }}
                    error={isError}
                    margin="normal"
                    fullWidth
                    id="Username"
                    //label={Resources.translate('common.emailAddress')}
                    type="email"
                    name="Username"
                    autoComplete="email"
                    autoFocus
                    placeholder="exemple@xyz.com"
                />
                <TextField
                    required
                    InputProps={{ startAdornment: <LockIcon color="secondary" sx={{ marginRight: 1 }} /> }}
                    error={isError}
                    margin="normal"
                    fullWidth
                    name="Password"
                    //label={Resources.translate('common.password')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="*******"
                />
                {/* <FormControlLabel control={<Checkbox value="true" name="RememberMe" color="primary" />} label={Resources.translate('login.rememberMe')} /> */}
                <AppAlert isVisible={showError} onClose={onCloseAlert} severity="error" title={messageError} />
                <LoadingButton loading={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
                    {/* {Resources.translate('login.connect')} */}
                </LoadingButton>
                <Grid container>
                    <Grid item xs>
                        <Link href="login?mode=reset" variant="body2">
                            {/* {Resources.translate('login.forgotPassword')} */}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

interface ILoginForm {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isError: boolean;
    isLoading: boolean;
    messageError: string;
    showError: boolean;
    onCloseAlert: () => void;
}

function ResetForm() {
    const Resources = useResources();

    return (
        <>
            {/* <Regular marginBottom={1}>{Resources.translate('login.resetMessage')}</Regular> */}
            <Bold marginBottom={1} textAlign="left" variant="body2">
                {/* {Resources.translate('login.resetDetails')} */}
            </Bold>
            <Box component="form" onSubmit={null}>
                <TextField
                    InputProps={{ startAdornment: <EmailIcon color="secondary" sx={{ marginRight: 1 }} /> }}
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    // label={Resources.translate('common.emailAddress')}
                    type="email"
                    name="Email"
                    autoComplete="email"
                    autoFocus
                    placeholder="exemple@xyz.com"
                />
                <LoadingButton loading={false} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
                    {/* {Resources.translate('login.resetLabel')} */}
                </LoadingButton>
            </Box>
        </>
    );
}

// interface IResetForm {}
