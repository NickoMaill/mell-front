// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Box, Container } from '@mui/material';
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import appTool from '~/helpers/appTool';
import useNavigation from '~/hooks/useNavigation';
import NoAccessLayout from './NoAccessLayout';
import LandingPic from '../home/LandingPic';
import stylesResources from '~/resources/stylesResources';

// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Layout({ children, primaryBg = false, error = false }: ILayout) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const { pathname } = useLocation();
    const { getPathDescription, logCurrentRoute } = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        window.scrollTo(0, 0);
        appTool.changeTitle(getPathDescription(pathname).title);
        logCurrentRoute();
    }, [pathname]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box sx={{ backgroundColor: primaryBg ? "#ce8b71" : "#ffffff" }} className="page-wrapper">
            <Header />
            {(pathname === '/' && !error) && <LandingPic />}
            <Container sx={{ backgroundColor: "transparent" }} id="mainContainer" className='container' component="main">
                <NoAccessLayout>{children}</NoAccessLayout>
            </Container>
            <Footer />
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILayout {
    children: ReactNode;
    primaryBg?: boolean;
    error?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
