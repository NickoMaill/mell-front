// #region IMPORTS -> /////////////////////////////////////
import { Box, Typography } from '@mui/material';
import NotFoundPic from "~/assets/pictures/404.png";
import React from 'react'
import Layout from '~/components/Layout/Layout';
import stylesResources from '~/resources/stylesResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function  NotFound () {
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
            <Box className="d-flex justify-content-center align-items-center flex-column py-3">
                <Box sx={{ textAlign: "center", marginBottom: 3, marginTop: 2 }}>
                    <Typography color="white" fontWeight={"bold"} variant="h3" component={"h2"}>404</Typography>
                    <Typography color="white" fontWeight={"bold"} variant="h5" >Page non trouvée</Typography>
                    <Typography color="white" fontWeight={"bold"}>Oups! On dirait que vous êtes perdu. Revenez en page d'accueil</Typography>
                </Box>
                <img src={NotFoundPic} width={"25%"} onDragStart={() => false} />
            </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////