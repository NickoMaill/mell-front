// #region IMPORTS -> /////////////////////////////////////
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useStorage from '~/hooks/useStorage';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppFullPageLoader({ isLoading, handleClose, counting = false }: IAppFullPageLoader) {
    // #region STATE --> ///////////////////////////////////////
    const [show, setShow] = useState<boolean>(!counting);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Storage = useStorage();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (counting) {
            setTimeout(() => {
                setShow(true);
            }, 1000);
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {show && (
                <Backdrop sx={{ backgroundColor: Storage.getItem('darkMode') === 'true' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
                    <CircularProgress color="primary" size={70} />
                </Backdrop>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppFullPageLoader {
    isLoading: boolean;
    handleClose?: () => void;
    counting?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
