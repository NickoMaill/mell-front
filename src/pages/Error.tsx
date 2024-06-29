// #region IMPORTS -> /////////////////////////////////////
// #endregion IMPORTS -> //////////////////////////////////
import { Box, Typography } from "@mui/material";
import ErrorPic from "~/assets/pictures/500.png";
import Layout from "~/components/layout/Layout";
// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Error ({}: IError) {
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
        <Layout primaryBg error>
            <Box sx={{ height: "80vh" }} className="d-flex justify-content-center align-items-center flex-column py-3 h-100">
                    <Box sx={{ textAlign: "center", marginBottom: 3, marginTop: 2 }}>
                        <Typography color="white" fontWeight={"bold"} variant="h3" component={"h2"}>500</Typography>
                        <Typography color="white" fontWeight={"bold"} variant="h5" >Ça c'est un gros nœud!</Typography>
                        <Typography color="white" fontWeight={"bold"}>Nous avons rencontré une erreur inattendue. Nos développeurs sont en train de défaire ce nœud.</Typography>
                        <Typography color="white" fontWeight={"bold"}>Veuillez revenir plus tard.</Typography>
                    </Box>
                    <img src={ErrorPic} width={"15%"} onDragStart={() => false} />
                </Box>
        </Layout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IError {}
// #enderegion IPROPS --> //////////////////////////////////