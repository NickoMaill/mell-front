import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@mui/material';

export default function Header() {
    return (
        <AppBar position="relative">
            <Toolbar disableGutters>
                <Box sx={{ flexWrap: 'wrap' }} className="container d-flex justify-content-between align-items-center p-1">
                    <Link to={'/'}></Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
