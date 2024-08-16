// #region IMPORTS -> /////////////////////////////////////
import { Box, Divider } from '@mui/material';
import React, { ReactNode } from 'react';
import { Bold } from '../common/Text';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SectionLayout({ children, title }: ISectionLayout) {
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
        <Box className="my-3">
            <Box>
                <Bold variant="h4">{title}</Bold>
                <Divider />
            </Box>
            {children}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISectionLayout {
    children: ReactNode;
    title: string;
}
// #enderegion IPROPS --> //////////////////////////////////
