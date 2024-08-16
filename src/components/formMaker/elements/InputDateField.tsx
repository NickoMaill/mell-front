// #region IMPORTS -> /////////////////////////////////////
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import { DatePicker, DateTimePicker, DateView, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { deDE } from '@mui/x-date-pickers/locales';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/de';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputDateField({ id, label, disabled, required, format = 'DD/MM/YYYY', onChange, views = ['day', 'month', 'year'], value = '', openTo = 'day', size = 3, error, errorMessage, helpText, mode = 'date' }: IInputDateField) {
    // #region STATE --> ///////////////////////////////////////
    const [date, setDate] = useState<string>(value as any);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    moment.locale('de');
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase size={size} id={id} label={label} disabled={disabled} helpText={helpText} error={error} errorMessage={errorMessage} required={required}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'de'} localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}>
                {mode === 'date' ? (
                    <DatePicker sx={{ marginTop: '8px', marginBottom: '4px' }} slotProps={{ textField: { required: required } }} defaultValue={!date ? null : moment(date)} onChange={(e) => setDate(moment(e).format('YYYY-MM-DD'))} openTo={openTo} format={format} views={views} />
                ) : mode === 'dateTime' ? (
                    <DateTimePicker sx={{ marginTop: '8px', marginBottom: '4px' }} slotProps={{ textField: { required: required } }} defaultValue={!date ? null : moment(date)} onChange={(e) => setDate(moment(e).format('YYYY-MM-DD hh:mm:ss'))} format="DD/MM/YYYY hh:mm:ss" />
                ) : (
                    <TimePicker sx={{ marginTop: '8px', marginBottom: '4px' }} />
                )}
                <input type="hidden" id={id} name={id} value={date ? date : ''} onChange={onChange} />
            </LocalizationProvider>
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputDateField extends InputBaseType {
    format?: string;
    views?: DateView[];
    openTo?: DateView;
    mode?: 'date' | 'dateTime' | 'time';
}
// #endregion IPROPS --> //////////////////////////////////
