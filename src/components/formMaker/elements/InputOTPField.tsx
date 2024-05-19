// #region IMPORTS -> /////////////////////////////////////
import { useState } from 'react';
import InputBase from './InputBase';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import stylesResources from '~/resources/stylesResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputOTPField({ disabled, required, onComplete, error, id, label, helpText, errorMessage, size = 3, success, warning }: IInputOTPField) {
    // #region STATE --> ///////////////////////////////////////
    const [otp, setOtp] = useState('');
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase success={success} warning={warning} required={required} disabled={disabled} size={size} id={id} helpText={helpText} label={label} error={error} errorMessage={errorMessage}>
            <MuiOtpInput
                TextFieldsProps={{ placeholder: '0' }}
                sx={{ '.MuiOutlinedInput-notchedOutline': { borderColor: error ? stylesResources.theme.palette.error.main : null } }}
                validateChar={(c) => !isNaN(c as unknown as number)}
                length={6}
                id={id}
                value={otp}
                onChange={(v) => setOtp(v)}
                onComplete={onComplete}
                aria-disabled={disabled}
                inputMode="numeric"
                autoFocus
            />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputOTPField extends InputBaseType {
    onComplete: (v: string) => void;
}
// #endregion IPROPS --> //////////////////////////////////
