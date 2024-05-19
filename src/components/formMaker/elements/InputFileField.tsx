// #region IMPORTS -> /////////////////////////////////////
import { InputBaseType } from '~/core/types/FormMakerCoreTypes';
import InputBase from './InputBase';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useState } from 'react';
import useService from '~/hooks/useService';
import appTool from '~/helpers/appTool';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { Box, CircularProgress } from '@mui/material';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputFileField({ disabled, id, onChange, value = '', size = 12, error, label, errorMessage, helpText, required, showLabel, sx, isLoading }: IInputFileField) {
    // #region STATE --> ///////////////////////////////////////
    const [file, setFile] = useState<File>(null);
    const [isFileLoading, setIsFileLoading] = useState<boolean>(true);
    const Service = useService();
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getFileData = async () => {
        const filePath = (value as string).split('/');
        const request = await Service.getFile(value as string)
            .catch((err) => console.error(err))
            .finally(() => setIsFileLoading(false));
        setFile(new File([request as Blob], filePath[filePath.length - 1]));
    };

    const handleChange = (e: File) => {
        if (onChange) {
            onChange(e);
        }
        setFile(e);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (value && value !== '') {
            // if (!appTool.URLTester(value as string)) {
            //     throw new AppError(ErrorTypeEnum.Technical, 'wrong url format => ' + value);
            // }
            getFileData();
        } else {
            setIsFileLoading(false);
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <InputBase sx={sx} showLabel={showLabel} disabled={disabled || isFileLoading || isLoading} required={required} id={id} error={error} label={label} errorMessage={errorMessage} helpText={helpText} size={size}>
            <MuiFileInput
                error={error}
                InputProps={{
                    endAdornment: (isLoading || isFileLoading) && (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size={25} />
                        </Box>
                    ),
                }}
                // value={file}
                onChange={handleChange}
                disabled={disabled || isFileLoading || isLoading}
                id={id}
                name={id}
            />
            <input hidden type="hidden" name={id + 'Old'} defaultValue={value as string} />
            <input hidden type="hidden" name={id + 'Path'} defaultValue={file ? file.name : ''} />
        </InputBase>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputFileField extends InputBaseType {}
// #endregion IPROPS --> //////////////////////////////////
