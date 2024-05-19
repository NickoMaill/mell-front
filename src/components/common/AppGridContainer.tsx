// #region IMPORTS -> /////////////////////////////////////
import { SxProps } from '@mui/system/styleFunctionSx';
import { Theme } from '@mui/material/styles/createTheme';
import Grid from '@mui/material/Grid';
import React, { ReactNode } from 'react';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppGridContainer({ children, spacing = 5, width = '100%', sx }: IAppGrid) {
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
        <Grid container wrap="wrap" sx={sx} flexWrap="wrap" alignItems={'center'} width={width} spacing={spacing}>
            {children}
        </Grid>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppGrid {
    spacing?: number;
    children: ReactNode;
    width?: string | number;
    sx?: SxProps<Theme>;
}
// #endregion IPROPS --> //////////////////////////////////
