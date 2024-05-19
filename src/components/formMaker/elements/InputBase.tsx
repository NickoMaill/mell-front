// #region IMPORTS -> /////////////////////////////////////
import { FormControl, FormLabel, Grid } from '@mui/material';
import { ReactNode } from 'react';
import ToolTips from '~/components/common/AppTooltips';
import { Regular } from '~/components/common/Text';
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import stylesResources from '~/resources/stylesResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputBase({ disabled, children, label, helpText, error, size = 3, id, required, showLabel = true, sx, errorMessage, success, warning }: IInputBase) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // const ChildWrapper = ({ child }) => {
    //     return cloneElement(child, { id, name: id });
    // };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Grid item sx={sx} lg={size} md={size} xs={12} className={`divForm_${id}`}>
            <FormControl disabled={disabled} margin="dense" fullWidth error={error}>
                {showLabel && (
                    <FormLabel required={required && label ? true : false} sx={{ display: 'flex', fontWeight: 'bold', '.MuiFormLabel-asterisk': { color: stylesResources.theme.palette.error.main } }} error={error} htmlFor={id} style={{ color: warning ? '#FEA726' : success ? '#43a047' : null }}>
                        {label}
                        {helpText && <ToolTips textContent={helpText} />}
                    </FormLabel>
                )}
                {children}
                {error && errorMessage ? (
                    <Regular component="span" color="red">
                        {errorMessage}
                    </Regular>
                ) : null}
            </FormControl>
        </Grid>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputBase extends InputBaseType {
    children: ReactNode;
}
// #endregion IPROPS --> //////////////////////////////////
