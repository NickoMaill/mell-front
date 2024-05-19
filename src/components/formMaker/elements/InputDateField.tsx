// #region IMPORTS -> /////////////////////////////////////
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import { DatePicker, DateView, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from 'react';
import moment from 'moment';
import AppIcon from '~/components/common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputDateField({ id, label, disabled, required, format = 'DD/MM/YYYY', onChange, views = ['day', 'month', 'year'], value = '', openTo = 'day', size = 3, error, errorMessage, helpText, icon }: IInputDateField) {
    // #region STATE --> ///////////////////////////////////////
    const [date, setDate] = useState<string>(value as any);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <InputBase size={size} id={id} label={label} disabled={disabled} helpText={helpText} error={error} errorMessage={errorMessage} required={required}>
                <DatePicker slotProps={{ textField: { required: required } }} defaultValue={!date ? null : moment(date)} onChange={(e) => setDate(moment(e).format('YYYY-MM-DD'))} openTo={openTo} format={format} views={views} />
                <input type="hidden" id={id} name={id} value={date ? date : ''} onChange={onChange} />
            </InputBase>
        </LocalizationProvider>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputDateField extends InputBaseType {
    format?: string;
    views?: DateView[];
    openTo?: DateView;
}
// #endregion IPROPS --> //////////////////////////////////
