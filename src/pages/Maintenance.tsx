// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import Layout from '~/components/Layout/Layout';
import MaintenancePic from '~/assets/pictures/maintenance.webp';
import { Bold } from '~/components/common/Text';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Maintenance({}: IMaintenance) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box className="vh-100 bg-primary d-flex justify-content-center align-items-center flex-column py-3">
            <Box className="text-center mb-4 mt-3">
                <Bold color="white" fontWeight={'bold'} variant="h5" className="mb-3">
                    🚧 Oups ! Petite pause technique 🚧
                </Bold>
                <Bold color="white" fontWeight={'bold'} className="mb-1">
                    Notre site est en plein lifting, ou peut-être que notre développeur a confondu une ligne de code avec un spaghetti... 😅
                </Bold>
                <Bold className="mb-5" color="white" fontWeight={'bold'}>
                    On revient très vite, encore plus en forme. Merci de votre patience !
                </Bold>
            </Box>
            <img src={MaintenancePic} className="w-25" onDragStart={() => false} style={{ filter: 'contrast(1.15)' }} />
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IMaintenance {}
// #enderegion IPROPS --> //////////////////////////////////
