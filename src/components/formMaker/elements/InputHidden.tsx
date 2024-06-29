// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import { IFormMakerInput, InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputHidden ({ sx, style, disabled, required, onChange, error, id, icon, autoComplete, autoCapitalize, label, helpText, errorMessage, size = 3, value, isLoading, success, warning, placeholder }: IInputHidden) {
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
            <input type="hidden" onChange={onChange} defaultValue={value as string | number} />
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputHidden extends InputBaseType {}
// #enderegion IPROPS --> //////////////////////////////////