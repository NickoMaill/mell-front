// #region IMPORTS -> /////////////////////////////////////
import { SyntheticEvent, useEffect, useState } from 'react';
import InputBase from './InputBase';
import { Autocomplete, Box, Chip, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { InputBaseType, SelectOptionsType } from '~/core/types/FormMakerCoreTypes';
import AppIcon from '~/components/common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputAutoComplete({ sx, style, disabled, required, onChange, error, id, icon, autoComplete, autoCapitalize, label, helpText, errorMessage, size = 3, value, isLoading, success, warning, placeholder, options, showLabel, ssr = false }: IInputAutoComplete) {
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
        <InputBase id={id} error={error} required={required} showLabel={showLabel} errorMessage={errorMessage} label={label} disabled={disabled} size={size} success={success} warning={warning}>
            <Autocomplete
                freeSolo
                disabled={disabled}
                options={options}
                defaultValue={value}
                clearOnBlur
                fullWidth
                className={error ? 'autocomplete-error' : success ? 'autocomplete-success' : warning ? 'autocomplete-warning' : null}
                renderInput={(params) => (
                    <TextField
                        margin="dense"
                        disabled={disabled}
                        variant="outlined"
                        sx={{ backgroundColor: disabled ? '#e8e5e5' : 'transparent', borderRadius: 1 }}
                        {...params}
                        InputProps={{
                            className: "autocomplete-textfield-override",
                            style: style,
                            startAdornment: icon && (
                                <InputAdornment position="start">
                                    <AppIcon name={icon} />
                                </InputAdornment>
                            ),
                            endAdornment: isLoading && (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress size={25} />
                                </Box>
                            ),
                            sx: { 
                                backgroundColor: disabled ? '#e8e5e5' : 'transparent' ,
                            },
                        }}
                    />
                )}
            />
            <input type="hidden" id={id as string} name={id as string} value={value as string} onChange={onChange} />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputAutoComplete extends InputBaseType {
    options: SelectOptionsType[];
    ssr?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
