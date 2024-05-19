// #region IMPORTS -> /////////////////////////////////////
// #endregion IMPORTS -> //////////////////////////////////

import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputSubmit({ label, onBackPress, isLoading }: IInputSubmit) {
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
            <LoadingButton loading={isLoading} variant="contained" type="submit">
                {label}
            </LoadingButton>
            <Button sx={{ marginLeft: 2 }} onClick={onBackPress} variant="contained" color="secondary">
                Annuler
            </Button>
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputSubmit {
    label: string;
    onBackPress?: () => void;
    isLoading?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
