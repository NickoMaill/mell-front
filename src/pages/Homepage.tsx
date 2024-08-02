// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AppIcon from '~/components/common/AppIcon';
import CurrentShow from '~/components/home/CurrentShow';
import Instagram from '~/components/home/Instagram';
import LandingPic from '~/components/home/LandingPic';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////

// #endregion SINGLETON --> /////////////////////////////////

export default function Homepage() {
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
        <Box>
            <Box component="section">
                <CurrentShow/>
            </Box>
            <Box component="section">
                <Instagram/>
            </Box>
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
