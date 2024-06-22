import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { ArrowBack, PersonOff } from '@mui/icons-material';
import navigationResources from '~/resources/navigationResources';
import useNavigation from '~/hooks/useNavigation';

// const wording = resources.admin.album;

export default function AdminLayout({ children, title, subtitle = '' }: IAdminLayout) {
    const router = useNavigation();

    // const navigate = async () => {
    //     await router.navigate('AdminHome');
    // };

    // const disconnect = async () => {
    //     Context.setIsAdminLogged(false);
    //     await service.useServiceWithRedirect(authService.disconnectSession(), 'AdminLogin');
    // };

    return (
        <Box>
            <Box position="relative" className="mt-4">
                <Box right={0} className="position-absolute mt-2">
                    {router.pathname !== navigationResources.routesPath.admin ? (
                        <Button variant="outlined" startIcon={<ArrowBack />} sx={{ marginLeft: 3 }}>
                            Accueil
                        </Button>
                    ) : (
                        <Button variant="outlined" startIcon={<PersonOff />} sx={{ marginLeft: 3 }}>
                            Déconnexion
                        </Button>
                    )}
                </Box>
                <Box textAlign="center" className="mb-2">
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{subtitle}</Typography>
                </Box>
                <Container>
                    <Divider className='m-0' variant="middle" />
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
