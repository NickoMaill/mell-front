// #region IMPORTS -> /////////////////////////////////////
import { MuiColorInput } from 'mui-color-input';
import { useEffect, useState } from 'react';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputColorField({ disabled, value = '', error, onChange, required, id, size }: IInputColorField) {
    // #region STATE --> ///////////////////////////////////////
    const [color, setColor] = useState<string>(value as string);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        // console.log(color);
    }, [color]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase required={required} disabled={disabled} id={id} label="Couleur" size={size}>
            <MuiColorInput disabled={disabled} value={color} sx={{ marginTop: 1.95, backgroundColor: disabled ? '#e8e5e5' : 'transparent', borderRadius: 1 }} onChange={(v) => setColor(v)} error={error} format="hex" /*required={required}*/ />
            <input id={id} name={id} disabled={disabled} type="hidden" value={color} onChange={onChange} />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputColorField extends InputBaseType {}
// #endregion IPROPS --> //////////////////////////////////
