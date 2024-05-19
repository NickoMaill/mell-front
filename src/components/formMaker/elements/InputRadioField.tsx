// #region IMPORTS -> /////////////////////////////////////
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { InputBaseType, RadioOptionsType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputRadioField({ disabled, id, onChange, value, options, size, label }: IInputRadioField) {
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
        <InputBase disabled={disabled} id={id} label={label} size={size}>
            <RadioGroup id={id} name={id} defaultValue={value} onChange={onChange}>
                {options.map((option, i) => {
                    return <FormControlLabel disabled={disabled} key={i} value={option.value} control={<Radio disabled={disabled} />} label={option.label} />;
                })}
            </RadioGroup>
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputRadioField extends InputBaseType {
    options: RadioOptionsType[];
}
// #endregion IPROPS --> //////////////////////////////////
