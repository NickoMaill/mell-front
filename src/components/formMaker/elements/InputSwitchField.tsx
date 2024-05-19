// #region IMPORTS -> /////////////////////////////////////
import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { InputBaseType, CheckboxOptionType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputSwitchField({ disabled, id, options, value = '', label, size = 3, onChange }: IInputSwitchField) {
    // #region STATE --> ///////////////////////////////////////
    const [switches, setCheckboxes] = useState<string>(value as string);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newArr = switches.trim().split(',');
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
        <InputBase disabled={disabled} id={id} label={label} size={size}>
            <FormGroup onChange={handleChange}>
                <Grid container wrap="wrap" flexWrap="wrap" spacing={2}>
                    {options.map((option, i) => {
                        return (
                            <Grid key={i} item lg={5} md={5} xs={12}>
                                <FormControlLabel disabled={disabled} control={<Switch disabled={disabled} checked={switches.includes(option.value as string)} value={option.value} />} label={option.label} />
                            </Grid>
                        );
                    })}
                    <input type="hidden" disabled={disabled} id={id} name={id} value={switches} onChange={onChange} />
                </Grid>
            </FormGroup>
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputSwitchField extends InputBaseType {
    options: CheckboxOptionType[];
}
// #endregion IPROPS --> //////////////////////////////////
