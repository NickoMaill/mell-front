// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import useNavigation from '~/hooks/useNavigation';
import NavigationResource from '~/resources/navigationResources';
import HeaderLink from '../common/HeaderLink';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Links() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box display={'flex'}>
            {NavigationResource.headerLinks.map((hl, i) => <HeaderLink key={i} {...hl} />)}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILinks {}
// #enderegion IPROPS --> //////////////////////////////////
