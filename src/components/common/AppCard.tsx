// #region IMPORTS -> /////////////////////////////////////
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { SxProps } from '@mui/system/styleFunctionSx';
import { ReactNode } from 'react';
import AppIcon, { IconNameType } from './AppIcon';
import { Theme } from '@emotion/react';
import stylesResources from '~/resources/stylesResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppCard({ children, title, icon, sx }: IAppCard) {
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
        <Card sx={{ marginBlock: 2, ...sx }}>
            <CardHeader title={title} style={{ backgroundColor: stylesResources.theme.palette.primary.main, color: 'white', padding: 10 }} titleTypographyProps={{ fontSize: 22 }} avatar={icon && <AppIcon name={icon} sx={{ fontSize: 26 }} />} />
            <CardContent>{children}</CardContent>
        </Card>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppCard {
    children: ReactNode;
    title: string;
    icon?: IconNameType;
    sx?: SxProps<Theme>;
}
// #endregion IPROPS --> //////////////////////////////////
