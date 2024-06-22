// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Box, Container } from '@mui/material';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import appTool from '~/helpers/appTool';
import useNavigation from '~/hooks/useNavigation';
import NoAccessLayout from './NoAccessLayout';
import LandingPic from '../home/LandingPic';

// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Layout({ children }: ILayout) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const { pathname } = useLocation();
    const { getPathDescription } = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        window.scrollTo(0, 0);
        appTool.changeTitle(getPathDescription(pathname).title);
    }, [pathname]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box className="page-wrapper">
            <Header />
            {pathname === '/' && <LandingPic />}
            <Container id="mainContainer" className='container' component="main">
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
}
// #endregion IPROPS --> //////////////////////////////////
