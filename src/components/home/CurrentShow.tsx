// #region IMPORTS -> /////////////////////////////////////
import { Box, CircularProgress, Paper } from '@mui/material';
import React, { useState } from 'react'
import { Bolder, Regular } from '../common/Text';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function CurrentShow () {
    // #region STATE --> ///////////////////////////////////////
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box>
            {isLoading ? (
                <Box height={200} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress size={60}/>
                </Box>
            ) : (
                data ? (
                    <Paper>
                        <Box borderBottom={3}>
                            <Box>
                                <Bolder></Bolder>
                                <Regular></Regular>
                            </Box>
                            <Box></Box>
                        </Box>
                        <Box></Box>
                    </Paper>
                ) : <></>
            )}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////