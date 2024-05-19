// #region IMPORTS -> /////////////////////////////////////
import { Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import { AutoCapitalizeType, AutoCompleteType, InputBaseType, InputModeType, InputType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import AppIcon from '~/components/common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputTextField({ sx, style, inputStyle, disabled, required, onChange, error, id, type = 'text', icon, mode, autoComplete, autoCapitalize, label, helpText, errorMessage, size = 3, value, isLoading, success, warning, placeholder }: IInput) {
    // #region STATE --> ///////////////////////////////////////
    const [currentMode, setCurrentMode] = useState<typeof mode>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const buildMode = (): void => {
        switch (type) {
            case 'email':
                setCurrentMode('email');
                break;
            case 'text':
                setCurrentMode('text');
                break;
            case 'number':
                setCurrentMode('numeric');
                break;
            case 'search':
                setCurrentMode('search');
                break;
            case 'url':
                setCurrentMode('url');
                break;
            case 'tel':
                setCurrentMode('tel');
                break;
            default:
                setCurrentMode('none');
                break;
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (!mode) {
            buildMode();
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase sx={sx} success={success} warning={warning} required={required} disabled={disabled} size={size} id={id} helpText={helpText} label={label} error={error} errorMessage={errorMessage}>
            <TextField
                disabled={disabled}
                variant="outlined"
                type={type}
                inputMode={currentMode}
                placeholder={placeholder}
                defaultValue={value}
                name={id}
                id={id}
                className={success ? 'text-field-success' : warning ? 'text-field-warning' : null}
                //required={required}
                margin="dense"
                fullWidth
                onChange={onChange}
                error={error}
                autoComplete={autoComplete}
                autoCapitalize={autoCapitalize}
                InputProps={{
                    style: style,
                    inputProps: { style: inputStyle },
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
                    sx: { backgroundColor: disabled ? '#e8e5e5' : 'transparent' },
                }}
            />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInput extends InputBaseType {
    type?: InputType;
    mode?: InputModeType;
    autoComplete?: AutoCompleteType;
    autoCapitalize?: AutoCapitalizeType;
    inputStyle?: CSSProperties;
}
// #endregion IPROPS --> //////////////////////////////////
