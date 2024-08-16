import Box from '@mui/material/Box';
import { ReactNode, useState } from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { ArrowBack, PersonOff } from '@mui/icons-material';
import navigationResources from '~/resources/navigationResources';
import useNavigation from '~/hooks/useNavigation';
import useSessionService from '~/hooks/useSessionService';
import { LoadingButton } from '@mui/lab';

export default function AdminLayout({ children, title, subtitle = '' }: IAdminLayout) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useNavigation();
    const Session = useSessionService();

    const disconnect = async () => {
        setIsLoading(true);
        await Session.logout()
            .then((res) => router.goToHomePage())
            .finally(() => setIsLoading(false));
    };

    return (
        <Box>
            <Box position="relative" className="mt-4">
                <Box right={0} className="position-absolute mt-2">
                    {router.pathname !== navigationResources.routesPath.admin ? (
                        <Button variant="outlined" startIcon={<ArrowBack />} className="ms-4">
                            Accueil
                        </Button>
                    ) : (
                        <LoadingButton loading={isLoading} variant="outlined" onClick={disconnect} startIcon={<PersonOff />} className="ms-4">
                            Déconnexion
                        </LoadingButton>
                    )}
                </Box>
                <Box textAlign="center" className="mb-2">
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{subtitle}</Typography>
                </Box>
                <Container>
                    <Divider className="m-0" variant="middle" />
                </Container>
            </Box>
            <>{children}</>
        </Box>
    );
}

interface IAdminLayout {
    children: ReactNode;
    title: string;
    subtitle?: string;
}
