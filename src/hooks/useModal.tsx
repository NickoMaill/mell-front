// #region IMPORTS -> /////////////////////////////////////
import { Breakpoint, DialogProps } from '@mui/material';
import React, { ReactNode, useContext } from 'react';
import ModalContext from '~/context/modalContext';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useModal(): IUseModal {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const ModalCxt = useContext(ModalContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const openModal = (title: string, content: ReactNode, size: Breakpoint = 'sm', scroll: DialogProps['scroll'] = 'body', persistant: boolean = false) => {
        ModalCxt.setContent(content);
        ModalCxt.setTitle(title);
        ModalCxt.setIsOpen(true);
        ModalCxt.setOptions({ size, scroll, persistant });
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { openModal };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseModal {
    openModal: (title: string, content: ReactNode, size?: Breakpoint, scroll?: DialogProps['scroll']) => void;
}
// #enderegion IPROPS --> //////////////////////////////////
