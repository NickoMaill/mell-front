// #region IMPORTS -> /////////////////////////////////////
import { Box, CircularProgress, InputAdornment, MenuItem, Select } from '@mui/material';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import AppIcon from '~/components/common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputSelectField({ disabled, size, id, value = '', onChange, required, error, options, helpText, label, errorMessage, icon, isLoading, success, warning, sx }: IInputSelectField) {
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
        <InputBase sx={sx} size={size} disabled={disabled} id={id} required={required} helpText={helpText} label={label} error={error} errorMessage={errorMessage}>
            {options && options.length > 0 ? (
                <Select
                    required={required}
                    disabled={disabled}
                    displayEmpty={!required}
                    sx={{ marginTop: '8px', marginBottom: '4px', backgroundColor: disabled ? '#e8e5e5' : 'transparent' }}
                    color={success ? 'success' : warning ? 'warning' : null}
                    id={id}
                    name={id}
                    defaultValue={required && !value ? (options[0].value ?? '') : !value ? '' : value}
                    onChange={onChange}
                    error={error}
                    fullWidth
                    slotProps={{
                        root: { title: id },
                    }}
                    endAdornment={
                        isLoading && (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={25} />
                            </Box>
                        )
                    }
                    startAdornment={
                        icon && (
                            <InputAdornment position="start">
                                <AppIcon name={icon} />
                            </InputAdornment>
                        )
                    }
                >
                    {!required && options.length > 0 && options.findIndex((x) => x.value === '') ? <MenuItem value="">aucun</MenuItem> : null}
                    {options.map((option, i) => (
                        <MenuItem disabled={disabled} key={i} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <CircularProgress />
            )}
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputSelectField extends InputBaseType {
    options: { value: any; label: string }[];
}
// #endregion IPROPS --> //////////////////////////////////
