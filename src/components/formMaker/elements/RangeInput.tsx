// #region IMPORTS -> /////////////////////////////////////
import React, { CSSProperties } from 'react';
import InputBase from './InputBase';
import { Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import AppIcon from '~/components/common/AppIcon';
import { AutoCapitalizeType, AutoCompleteType, InputBaseType, InputModeType, InputType } from '~/core/types/FormMakerCoreTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function RangeInput({ sx, style, inputStyle, disabled, required, onChange, error, id, type = 'text', icon, mode, autoComplete, autoCapitalize, label, helpText, errorMessage, size = 3, value, isLoading, success, warning, placeholder }: IRangeInput) {
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
        <InputBase sx={sx} success={success} warning={warning} required={required} disabled={disabled} size={size} id={id} helpText={helpText} label={label} error={error} errorMessage={errorMessage}>
            <TextField
                disabled={disabled}
                variant="outlined"
                type="number"
                placeholder={placeholder}
                defaultValue={value}
                name={id}
                id={id}
                className={success ? 'text-field-success' : warning ? 'text-field-warning' : null}
                required={required}
                margin="dense"
                fullWidth
                onChange={onChange}
                error={error}
                InputProps={{
                    style: style,
                    inputProps: { style: inputStyle },
                    startAdornment: (
                        <select>
                            <option>=</option>
                            <option>{'>'}</option>
                            <option>{'<'}</option>
                        </select>
                    ),
                    sx: { backgroundColor: disabled ? '#e8e5e5' : 'transparent' },
                }}
            />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IRangeInput extends InputBaseType {
    type?: InputType;
    mode?: InputModeType;
    autoComplete?: AutoCompleteType;
    autoCapitalize?: AutoCapitalizeType;
    inputStyle?: CSSProperties;
}
// #enderegion IPROPS --> //////////////////////////////////
