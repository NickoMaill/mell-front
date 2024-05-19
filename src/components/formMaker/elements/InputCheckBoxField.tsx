// #region IMPORTS -> /////////////////////////////////////
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { InputBaseType, CheckboxOptionType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import { ChangeEvent, useState } from 'react';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputCheckBoxField({ disabled, options, id, onChange, value = '', label, rowReverse }: IInputCheckBoxField) {
    // #region STATE --> ///////////////////////////////////////``
    const [checkboxes, setCheckboxes] = useState<string>(value as string);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newArr = checkboxes.trim().split(',');
        newArr = newArr.filter((x) => x !== '');

        if (e.target.checked) {
            if (!newArr.includes(e.target.value)) {
                newArr.push(e.target.value);
            }
        } else {
            if (newArr.includes(e.target.value)) {
                newArr = newArr.filter((x) => x !== e.target.value);
            }
        }
        setCheckboxes(newArr.join(','));
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase disabled={disabled} id={id} label={label} size={3}>
            <FormGroup sx={{ flexGrow: 1 }} onChange={handleChange}>
                <Grid container wrap="wrap" flexWrap="wrap" spacing={2}>
                    {options.map((item, i) => {
                        return (
                            <Grid key={i} item lg={5} md={5} xs={12}>
                                <FormControlLabel key={i} sx={{ flexDirection: rowReverse ? 'row-reverse' : 'row' }} label={item.label} control={<Checkbox disabled={disabled} value={item.value} checked={checkboxes.includes(item.value as string)} onChange={(e) => e} />} />
                            </Grid>
                        );
                    })}
                </Grid>
                <input type="hidden" id={id} name={id} value={checkboxes} onChange={onChange} />
            </FormGroup>
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputCheckBoxField extends InputBaseType {
    options: CheckboxOptionType[];
    rowReverse?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
