// #region IMPORTS -> /////////////////////////////////////
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Box } from '@mui/material';
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import appTool from '~/helpers/appTool';
import useNavigation from '~/hooks/useNavigation';
import NoAccessLayout from './NoAccessLayout';

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
        <>
            {pathname !== '/login' && <Header />}
            <Box id="mainContainer" className="container" component="main" sx={{ marginBlock: 10 }}>
                <NoAccessLayout>{children}</NoAccessLayout>
            </Box>
            <Footer />
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILayout {
    children: ReactNode;
}
// #endregion IPROPS --> //////////////////////////////////
