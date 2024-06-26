// #region IMPORTS -> /////////////////////////////////////
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import useNavigation from '~/hooks/useNavigation';
import { useContext, useEffect, useState } from 'react';
import { Box, Checkbox, CircularProgress, Container, FormControlLabel, Grid, LinearProgress, Link, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AppAlert from '~/components/common/AppAlert';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import useResources from '~/hooks/useResources';
import { Bold, Regular } from '~/components/common/Text';
import { useSearchParams } from 'react-router-dom';
import SessionContext from '~/context/sessionContext';
import { AppError } from '~/core/appError';
import useAuthSession from '~/hooks/useSessionService';
import configManager from '~/managers/configManager';
import { Trans } from 'react-i18next';
import InputOTPField from '~/components/formMaker/elements/InputOTPField';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Login() {
    // #region STATE --> ///////////////////////////////////////
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>(null);
    // const [mfaMode, setMfaMode] = useState<boolean>(false);
    const [resetMode, setResetMode] = useState<boolean>(false);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    const [resendCount, setResendCount] = useState<number>(11);
    const [title, setTitle] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
     const SessionService = useAuthSession();
    const Navigation = useNavigation();
    const Ses = useContext(SessionContext);
    const Resources = useResources();
    const [params] = useSearchParams();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const hideAlert = () => {
        setShowAlert(false);
    };
    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);
        await SessionService.login(data)
            .then((isLoginOk) => {
                if (isLoginOk) {
                    Navigation.navigate("Admin");
                    // setIsError(false);
                    // setMessageError(null);
                    // setShowAlert(true);
                    // setMfaMode(true);
                }
            })
            .catch((err: AppError) => {
                console.log(err);
                switch (err.code) {
                    case 'invalid_credentials':
                        setMessageError(Resources.translate('login.wrongCredentials'));
                        setShowAlert(true);
                        setIsError(true);
                        break;
                    case 'email_required':
                        setMessageError(Resources.translate('login.requiredEmail'));
                        setShowAlert(true);
                        setIsError(true);
                        break;
                    case 'password_required':
                        setMessageError(Resources.translate('login.requiredPassword'));
                        setShowAlert(true);
                        setIsError(true);
                        break;
                    default:
                        setMessageError(Resources.translate('error.common.error'));
                        setShowAlert(true);
                        setIsError(true);
                        break;
                }
            })
            .finally(() => setIsLoading(false));
    };

    // const handleSubmitOtp = async (value: string) => {
    //     const form = new FormData();
    //     form.append('otp', value);
    //     setIsLoading(true);
    //     await SessionService.loginOpt(form)
    //         .then((res) => {
    //             if (res) {
    //                 setIsError(false);
    //                 setMessageError(null);
    //                 if (params.has('target')) {
    //                     Navigation.navigateByPath(params.get('target'));
    //                 } else {
    //                     Navigation.goToHomePage();
    //                 }
    //             } else {
    //                 setIsError(true);
    //                 setShowAlert(true);
    //                 setMessageError('code invalide');
    //             }
    //         })
    //         .catch((err: AppError) => {
    //             setIsError(true);
    //             switch (err.code) {
    //                 case 'session_expired':
    //                     setMfaMode(false);
    //                     setIsError(false);
    //                     setShowAlert(true);
    //                     setMessageError(Resources.translate('login.expiredSession'));
    //                     break;
    //                 case 'expired_otp':
    //                     setShowAlert(true);
    //                     setMessageError(Resources.translate('login.expiredMfa'));
    //                     break;
    //             }
    //         })
    //         .finally(() => setIsLoading(false));
    // };

    // const onResendMfa = async () => {
    //     SessionService.requestOtp();
    //     let i = 0;
    //     setResendCount(i);
    //     const timer = setInterval(() => {
    //         if (i === 11) {
    //             clearInterval(timer);
    //         } else {
    //             i++;
    //             setResendCount(i);
    //         }
    //     }, 1000);
    // };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (params.get('mode') === 'reset') {
            setResetMode(true);
            setIsPageLoading(false);
        } else {
            SessionService.refreshSession()
                .then((res) => {
                    if (res) {
                        console.log("hello");
                        Navigation.navigate("Admin");
                    }
                })
                .catch((err: AppError) => {
                    console.error(err);
                })
                .finally(() => setIsPageLoading(false));
        }
    }, []);

    useEffect(() => {
        // if (mfaMode) {
        //     setTitle(Resources.translate('login.MfaTitle'));
        // } else 
        if (resetMode) {
            setTitle(Resources.translate('login.resetTitle'));
        } else {
            setTitle("Connexion");
        }
    }, [resetMode]);
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
                            <Bold component="h1" variant="h4" color="secondary">
                                {title}
                            </Bold>
                            {isLoading && <CircularProgress sx={{ marginLeft: 2 }} />}
                        </Box>
                        {resetMode ? ( 
                            <ResetForm />
                        ) : (
                            <LoginForm isError={isError} showError={showAlert} onCloseAlert={hideAlert} messageError={messageError} onSubmit={handleSubmitLogin} isLoading={isLoading} />
                        )}
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
                    id="username"
                    label={Resources.translate('common.emailAddress')}
                    type="email"
                    name="username"
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
                    name="password"
                    label={Resources.translate('common.password')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="*******"
                />
                <FormControlLabel control={<Checkbox value="true" name="RememberMe" color="primary" />} label={Resources.translate('login.rememberMe')} />
                <AppAlert isVisible={showError} onClose={onCloseAlert} severity="error" title={messageError} />
                <LoadingButton loading={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
                    {Resources.translate('login.connect')}
                </LoadingButton>
                <Grid container>
                    <Grid item xs>
                        <Link href="login?mode=reset" variant="body2">
                            {Resources.translate('login.forgotPassword')}
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

function OtpForm({ onComplete, onResend, resendWaitCount = 10, isError, messageError, showError, onCloseAlert }: IOtpForm) {
    const Resources = useResources();
    const Ses = useContext(SessionContext);

    return (
        <Box>
            <Bold sx={{ mb: 1 }} variant="h6">
                {Resources.translate('login.MfaSubtitle')}
            </Bold>
            <Regular sx={{ mb: 1 }} variant="body2">
                <Trans i18nKey="login.MfaDetails" values={{ username: Ses.name, phoneNumber: Ses.email }} />
            </Regular>
            <InputOTPField id="otp" error={isError} onComplete={onComplete} />
            <Box display="flex" mt={1}>
                <Box>
                    <Regular sx={{ mb: 1 }} variant="body2">
                        {Resources.translate('login.resendMfa')}{' '}
                    </Regular>
                </Box>
                {resendWaitCount < 11 ? (
                    <Box sx={{ width: '40%' }}>
                        <LinearProgress sx={{ mb: 1, ml: 1, height: 5, borderRadius: 50 }} variant="determinate" value={resendWaitCount * 10} />
                    </Box>
                ) : (
                    <Link sx={{ mb: 1, ml: 0.5 }} component="button" variant="body2" onClick={onResend}>
                        {Resources.translate('common.resend')}
                    </Link>
                )}
            </Box>
            <AppAlert severity="error" isVisible={showError} onClose={onCloseAlert} title={messageError} />
        </Box>
    );
}

interface IOtpForm {
    onComplete: (v: string) => void;
    phoneNumber: string;
    onResend: () => void;
    resendWaitCount: number;
    isError?: boolean;
    messageError?: string;
    showError: boolean;
    onCloseAlert: () => void;
}

function ResetForm() {
    const Resources = useResources();

    return (
        <>
            <Regular marginBottom={1}>{Resources.translate('login.resetMessage')}</Regular>
            <Bold marginBottom={1} textAlign="left" variant="body2">
                {Resources.translate('login.resetDetails')}
            </Bold>
            <Box component="form" onSubmit={null}>
                <TextField
                    InputProps={{ startAdornment: <EmailIcon color="secondary" sx={{ marginRight: 1 }} /> }}
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label={Resources.translate('common.emailAddress')}
                    type="email"
                    name="Email"
                    autoComplete="email"
                    autoFocus
                    placeholder="exemple@xyz.com"
                />
                <LoadingButton loading={false} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
                    {Resources.translate('login.resetLabel')}
                </LoadingButton>
            </Box>
        </>
    );
}

// interface IResetForm {}
