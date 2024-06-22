import { Link } from 'react-router-dom';
// import { AppBar, Box, Container, Toolbar } from '@mui/material';
import logo from '~/assets/pictures/logo.webp';
import Links from './Links';
import SocialMedia from './SocialMedia';

// export default function Header() {
//     return (
//         <AppBar position="relative" sx={{ zIndex: 1 }}>
//             <Toolbar disableGutters>
//                 <Container sx={{ flexWrap: 'wrap', position: "relative", padding: 1.7 }} className="d-flex justify-content-between align-items-center w-100 container">
//                     <SocialMedia />
//                     <Link className='logo-header-container' to={'/'}>
//                         <img src={logo} width={50} className="logo-header" />
//                     </Link>
//                     <Links />
//                 </Container>
//             </Toolbar>
//         </AppBar>
//     );
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import stylesResources from '~/resources/stylesResources';
import NavigationResource from '~/resources/navigationResources';
import HeaderLink from '../common/HeaderLink';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 300;

export default function Header() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography sx={{ my: 2 }}>
                <Link to={'/'}>
                    <img src={logo} width={50} className="logo-header" />
                </Link>
            </Typography>
            <Divider />
            <List>
                {[...NavigationResource.headerLinks, ...NavigationResource.footerLink].map((hl, i) => (
                    <ListItem key={i}>
                        <ListItemButton>
                            <HeaderLink {...hl} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" position='relative' sx={{ padding: 1.5, zIndex: 1 }}>
                <Toolbar className="d-flex justify-content-between align-items-center">
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        <SocialMedia />
                    </Typography>
                    <Box className="logo-header-container">
                        <Link to={'/'}>
                            <img src={logo} width={50} className="logo-header" />
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Links />
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { sm: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: stylesResources.theme.palette.primary.main } }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}
