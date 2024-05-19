// #region IMPORTS -> /////////////////////////////////////
import { Box, Breakpoint, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, styled } from '@mui/material';
import { ReactNode } from 'react';
import AppIcon from './AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Modal({ children, modalTitle, isOpen, onClose, modalAction, closable, modalActionLabel, isModalActionLoading, dismissLabel, maxWidth = 'md', persistant = false, scroll = 'paper' }: IModal) {
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
        <>
            <Dialog scroll={scroll} maxWidth={maxWidth} onClose={persistant ? null : onClose} fullWidth aria-labelledby="customized-dialog-title" open={isOpen}>
                <Box display={'flex'} justifyContent={modalTitle ? 'space-between' : 'end'}>
                    {modalTitle && (
                        <DialogTitle id="customized-dialog-title" sx={{ m: 0, p: 1.3 }}>
                            {modalTitle}
                        </DialogTitle>
                    )}
                    {closable && (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <AppIcon name="Close" />
                        </IconButton>
                    )}
                </Box>
                <DialogContent dividers>{children}</DialogContent>
                {modalAction && (
                    <DialogActions>
                        <Button autoFocus color="secondary" onClick={onClose}>
                            {dismissLabel}
                        </Button>
                        <Button autoFocus onClick={modalAction}>
                            {isModalActionLoading ? <CircularProgress /> : modalActionLabel}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IModal {
    children: ReactNode;
    modalTitle?: string;
    modalAction?: () => void;
    modalActionLabel?: string;
    isModalActionLoading?: boolean;
    dismissLabel?: string;
    closable?: boolean;
    onClose: () => void;
    isOpen: boolean;
    maxWidth?: Breakpoint;
    persistant?: boolean;
    scroll?: DialogProps['scroll'];
}
// #endregion IPROPS --> //////////////////////////////////
