import { Link } from 'react-router-dom';
import logo from '~/assets/pictures/logo.webp';
import Links from './Links';
import SocialMedia from './SocialMedia';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import { ListItem, ListItemButton } from '@mui/material';

const drawerWidth = 300;

export default function Header() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} className="text-center">
            <Link className="my-3" to={'/'}>
                <Button variant="text">
                    <img src={logo} width={50} className="logo-header" />
                </Button>
            </Link>
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
        <Box className="d-flex">
            <AppBar component="nav" position="relative" className="position-relative p-3 z-1">
                <Toolbar className="d-flex justify-content-between align-items-center">
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className="me-3" sx={{ mr: 2, display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        <SocialMedia />
                    </Typography>
                    <Box className="logo-header-container">
                        <Link to={'/'}>
                            <Button variant="text" color="secondary" className="p-2">
                                <img src={logo} width={40} className="logo-header" />
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Links />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { sm: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: stylesResources.theme.palette.primary.main } }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
