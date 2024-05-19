// #region IMPORTS -> /////////////////////////////////////
import { SvgIconPropsColorOverrides, SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon/SvgIcon';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/material/styles/createTheme';
import { OverridableStringUnion } from '@mui/types/index';
import * as MuiIcon from '@mui/icons-material';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
export type IconNameType = keyof typeof MuiIcon;
// #endregion SINGLETON --> /////////////////////////////////

export default function AppIcon({ name, color, sx, size, className }: IAppIcon) {
    // #region STATE --> ///////////////////////////////////////
    const Icon = MuiIcon[name];
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////

    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <>{Icon && <Icon sx={sx} color={color} fontSize={size} className={className} />}</>;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppIcon {
    name: IconNameType;
    color?: OverridableStringUnion<'action' | 'disabled' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning', SvgIconPropsColorOverrides>;
    sx?: SxProps<Theme>;
    size?: OverridableStringUnion<'small' | 'inherit' | 'large' | 'medium', SvgIconPropsSizeOverrides>;
    className?: string;
}
// #endregion IPROPS --> //////////////////////////////////
