// #region IMPORTS -> /////////////////////////////////////
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { frFR } from '@mui/x-date-pickers/locales';
import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Bio() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    moment.locale('fr');
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'fr'} localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DatePicker views={['day', 'month', 'year']} format="DD/MM/YYYY" />
            </LocalizationProvider>
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////
