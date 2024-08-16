// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import AppMiniCard from '~/components/common/AppMiniCard';
import AdminLayout from '~/components/Layout/AdminLayout';
import NavigationResource from '~/resources/navigationResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Admin() {
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
        <AdminLayout title={'Bienvenue !'} subtitle="Gérer le contenu de votre site comme bon vous semble">
            <Box className="d-flex justify-content-center">
                <Box className="d-flex flex-wrap justify-content-center align-items-center my-3">
                    {NavigationResource.adminLinks.map((l, i) => (
                        <AppMiniCard key={i} cardData={l} />
                    ))}
                </Box>
            </Box>
        </AdminLayout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////
