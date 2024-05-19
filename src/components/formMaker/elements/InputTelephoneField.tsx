// #region IMPORTS -> /////////////////////////////////////
import { MuiTelInput } from 'mui-tel-input';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import { useState } from 'react';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputTelephoneField({ disabled, required, onChange, error, id, helpText, errorMessage, label, value = '', size }: IInputTelephoneField) {
    // #region STATE --> ///////////////////////////////////////
    const [tel, setTel] = useState<string>((value as string) || '');
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (v: string) => {
        if (v.split(' ').length === 1) {
            setTel('');
        } else {
            setTel(v);
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase size={size} disabled={disabled} id={id} helpText={helpText} label={label} error={error} errorMessage={errorMessage}>
            <MuiTelInput disabled={disabled} value={tel} onChange={handleChange} error={error} sx={{ marginTop: 1, backgroundColor: disabled ? '#e8e5e5' : 'transparent', borderRadius: 1 }} defaultCountry="FR" /*required={required}*/ />
            <input type="hidden" value={tel} onChange={onChange} id={id} name={id} />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputTelephoneField extends InputBaseType {}
// #endregion IPROPS --> //////////////////////////////////
