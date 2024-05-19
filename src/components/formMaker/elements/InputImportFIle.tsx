// #region IMPORTS -> /////////////////////////////////////
import { useEffect, useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import AppIcon from '~/components/common/AppIcon';
import { Regular } from '~/components/common/Text';
import AppAlert from '~/components/common/AppAlert';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function InputImportFile({ typeFile, filesLimit = 1, className, dropzoneText, onChange }: IInputImportFile) {
    // #region STATE --> ///////////////////////////////////////
    const [value, setValue] = useState<File[]>(null);
    const [isWrongTypeFile, setIsWrongTypeFile] = useState<boolean>(false);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const deleteFiles = (targetFile: number) => {
        const newValue = [...value].filter((_, i2) => i2 !== targetFile);
        if (newValue.length > 0) {
            setValue(newValue);
            onChange(value);
        } else {
            setValue(null);
            onChange(null);
        }
    };

    const verifyFile = (files: File[]) => {
        let isOk = true;
        if (files.length === 0) {
            isOk = false;
        }
        files.forEach((f) => {
            if (!typeFile.includes(f.type as FileExtension)) {
                isOk = false;
            }
        });
        if (isOk) {
            onChange(files);
            setValue(files);
            setIsWrongTypeFile(false);
        } else {
            setIsWrongTypeFile(true);
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        console.log(isDrag);
    }, [isDrag]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {value && value.length > 0 ? (
                [...value].map((file, i) => {
                    return (
                        <Paper key={i} sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                            <Box display="flex" alignItems={'center'}>
                                <AppIcon sx={{ mr: 1 }} name={value[0].type.includes('image') ? 'Image' : 'InsertDriveFileOutlined'} />
                                <Regular mt={0.3}>{file.name}</Regular>
                            </Box>
                            <IconButton onClick={() => deleteFiles(i)}>
                                <AppIcon name="Close" />
                            </IconButton>
                        </Paper>
                    );
                })
            ) : (
                <>
                    <Box component="div" onDragOver={() => setIsDrag(true)} draggable onDragLeave={() => setIsDrag(false)} onDrop={() => setIsDrag(false)} className={`rounded w-100 drag-base ${isDrag ? 'drag-on' : 'drag-off'}`}>
                        <Box sx={{ borderStyle: 'dashed' }} className="position-relative border border-2 rounded border-secondary w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                            <Box className="d-flex flex-column justify-content-evenly align-items-center h-75">
                                <AppIcon name={isWrongTypeFile ? 'Error' : 'CloudUploadOutlined'} sx={{ fontSize: '4rem' }} color={isWrongTypeFile ? 'error' : 'secondary'} />
                                <Regular component="span" id="fileMonitor">
                                    {isWrongTypeFile ? (
                                        <>
                                            Format du fichier <b>invalide</b> ...
                                        </>
                                    ) : (
                                        <>
                                            {dropzoneText ?? (
                                                <>
                                                    Glissez / déposez votre fichier <b>ici</b>
                                                </>
                                            )}
                                        </>
                                    )}
                                </Regular>
                            </Box>
                            <input type="file" onChange={(e) => verifyFile([...e.target.files])} multiple={filesLimit > 1} className="opacity-0 position-absolute w-100 h-100 border" name="file" id="file" />
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IInputImportFile {
    typeFile: AllowedFilesInput;
    filesLimit?: number;
    className?: string;
    dropzoneText?: string;
    onChange: (e: File[]) => void;
}

export type AllowedFilesInput = FileExtension[];
export type FileExtension = 'text/csv' | 'text/pdf' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/xml' | 'application/vnd.ms-excel';
// #endregion IPROPS --> //////////////////////////////////
