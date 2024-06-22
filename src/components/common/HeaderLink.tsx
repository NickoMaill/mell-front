// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function HeaderLink({ link, title, label }: IHeaderLink) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const { pathname } = useLocation();
    const { getPathDescription } = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box position="relative" className="px-3">
            <Link className={`nav-link text-nowrap`} to={link} title={title}>
                {label}
            </Link>
            {getPathDescription(pathname).path === link && <i className="nav-link-selected w-100"></i>}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IHeaderLink {
    label: string;
    title: string;
    link: string;
}
// #enderegion IPROPS --> //////////////////////////////////
