import { AppBar, Box, Container, IconButton } from '@mui/material';
import SocialMedia from './SocialMedia';
import stylesResources from '~/resources/stylesResources';
import AppIcon from '../common/AppIcon';
import NavigationResource from '~/resources/navigationResources';
import HeaderLink from '../common/HeaderLink';
// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function Footer() {
    // state --> start region ////////////////////////////////////
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <Box display={{ md: "block", sm: "none" }} sx={{ backgroundColor: stylesResources.theme.palette.primary.main }} component="footer">
            <Container className="p-3 d-flex justify-content-between align-items-center container">
                {NavigationResource.footerLink.map((fl, i) => <HeaderLink key={i} {...fl} />)}
                <SocialMedia />
            </Container>
        </Box>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
// interface IFooter {}
// props interface --> end region ////////////////////////////////