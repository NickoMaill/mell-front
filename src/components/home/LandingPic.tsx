// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import React from 'react'
import logo from "~/assets/pictures/logo.webp"
import landingPic from "~/assets/pictures/landing-no-text.png";
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function LandingPic ({}: ILandingPic) {
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
        <Box className="position-relative">
            <img className='landing-pic' src={landingPic} />
            <img width={"25%"} className='logo-header position-absolute landing-logo' src={logo} />
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILandingPic {}
// #enderegion IPROPS --> //////////////////////////////////