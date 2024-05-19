// #region IMPORTS -> /////////////////////////////////////
import { Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import InputBase from './InputBase';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import { ChangeEvent, useState } from 'react';
import { Regular } from '~/components/common/Text';
import AppIcon from '~/components/common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputTextAreaField({ disabled, id, onChange, value = '', size = 12, error, label, errorMessage, helpText, rows = 10, limit, required, showLabel, sx, isLoading, icon, success, warning }: IInputTextAreaField) {
    // #region STATE --> ///////////////////////////////////////
    const [isOutOfLimit, setIsOutOfLimit] = useState<boolean>(false);
    const [textLength, setTextLength] = useState<number>(0);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextLength(e.target.value.length);
        if (e.target.value.length > limit) {
            setIsOutOfLimit(true);
            error = true;
        } else {
            setIsOutOfLimit(false);
            error = false;
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase sx={sx} showLabel={showLabel} disabled={disabled} required={required} id={id} error={isOutOfLimit || error} label={label} errorMessage={errorMessage} helpText={helpText} size={size}>
            <TextField
                disabled={disabled}
                id={id}
                name={id}
                error={isOutOfLimit || error}
                color={success ? 'success' : warning ? 'warning' : null}
                type="text"
                defaultValue={value}
                onChange={(e) => {
                    handleChange(e);
                    if (onChange) {
                        onChange(e);
                    }
                }}
                inputMode="text"
                multiline
                fullWidth
                rows={rows}
                variant="outlined"
                InputProps={{
                    sx: { backgroundColor: disabled ? '#e8e5e5' : '#fff' },
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
                }}
            />
            {limit && (
                <Regular color={isOutOfLimit ? 'red' : 'grey'}>
                    {textLength} / {limit}
                </Regular>
            )}
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputTextAreaField extends InputBaseType {
    rows?: number;
    limit?: number;
}
// #endregion IPROPS --> //////////////////////////////////
