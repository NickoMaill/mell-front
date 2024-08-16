// #region IMPORTS -> /////////////////////////////////////
import Insta from '~/assets/svg/instagram.svg';
import Facebook from '~/assets/svg/facebook.svg';
import Youtube from '~/assets/svg/youtube.svg';
import { Box, Link } from '@mui/material';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const img = [
    { width: 20, title: 'Instagram', element: Insta },
    { width: 20, title: 'Facebook', element: Facebook },
    { width: 27, title: 'Youtube', element: Youtube },
];
// #endregion SINGLETON --> /////////////////////////////////

export default function SocialMedia() {
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
        <Box className="d-flex align-items-center">
            {img.map((SvgIcon, i) => {
                return (
                    <Link key={i} className="cursor-pointer" marginInline={1}>
                        <img className="header-icon" src={SvgIcon.element} width={SvgIcon.width} title={SvgIcon.title} />
                    </Link>
                );
            })}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////
