// #region IMPORTS -> /////////////////////////////////////
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Regular } from './Text';
import { Box, Collapse, IconButton } from '@mui/material';
import AppIcon from './AppIcon';
import { useState } from 'react';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppAlert({ severity, title, subtitle, isVisible = true, onClose, anchorId }: IAppAlert) {
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
        <Collapse in={isVisible}>
            <Alert
                sx={{ marginBlock: 2, display: 'flex', alignItems: 'center' }}
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
                        <AppIcon name="Close" />
                    </IconButton>
                }
                severity={severity}
            >
                <AlertTitle sx={{ margin: 0, fontWeight: 'bold' }}>{title}</AlertTitle>
                {subtitle && <Regular dangerouslySetInnerHTML={{ __html: subtitle }} sx={{ marginTop: '0.35rem' }}></Regular>}
            </Alert>
        </Collapse>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppAlert {
    severity: AlertColor;
    isVisible?: boolean;
    title: string;
    subtitle?: string;
    onClose?: () => void;
    anchorId?: string;
}
// #endregion IPROPS --> //////////////////////////////////
