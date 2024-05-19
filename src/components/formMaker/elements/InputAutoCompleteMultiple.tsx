// #region IMPORTS -> /////////////////////////////////////
import { SyntheticEvent, useState } from 'react';
import InputBase from './InputBase';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { InputBaseType, SelectOptionsType } from '~/core/types/FormMakerCoreTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputAutoCompleteMultiple({ disabled, required, options, id, onChange, value = '', label, size = 3, error, errorMessage, success, warning, showLabel }: IInputAutoCompleteMultiple) {
    // #region STATE --> ///////////////////////////////////////
    const [multiple, setMultiple] = useState<string>(value as string);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (_event: SyntheticEvent, newValue: SelectOptionsType[]) => {
        const values = newValue.map((o) => o.value).join(',');
        if (values !== multiple) {
            setMultiple(values);
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase id={id} error={error} required={required} showLabel={showLabel} errorMessage={errorMessage} label={label} disabled={disabled} size={size} success={success} warning={warning}>
            <Autocomplete
                multiple
                disabled={disabled}
                options={options}
                sx={{ marginTop: 1 }}
                className={error ? 'autocomplete-error' : success ? 'autocomplete-success' : warning ? 'autocomplete-warning' : null}
                value={options.filter((option) => (multiple && multiple !== '' ? multiple.split(',').findIndex((m) => m === option.value) > -1 : undefined))}
                onChange={handleChange}
                getOptionLabel={(option) => option.label}
                renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip label={option.label} {...getTagProps({ index })} disabled={disabled} />)}
                renderInput={(params) => <TextField disabled={disabled} sx={{ backgroundColor: disabled ? '#e8e5e5' : 'transparent', borderRadius: 1 }} /*required={required}*/ {...params} />}
            />
            <input type="hidden" id={id} name={id} value={multiple ? multiple : ''} onChange={onChange} />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputAutoCompleteMultiple extends InputBaseType {
    options: SelectOptionsType[];
}
// #endregion IPROPS --> //////////////////////////////////
