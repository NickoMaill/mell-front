// #region IMPORTS -> /////////////////////////////////////
import { Box, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { MouseEvent, ReactNode, useState } from 'react';
import { Regular } from './Text';
import stylesResources from '~/resources/stylesResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function ToolTips({ textContent, children }: IToolTips) {
    // #region STATE --> ///////////////////////////////////////
    const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box paddingLeft={0.5} sx={{ marginBottom: -1 }} className="position-relative" component="div" aria-owns={anchorEl ? 'mouse-over-popover' : null} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
            {children ? children : <InfoOutlinedIcon sx={{ position: 'relative', top: '-2px' }} color="primary" />}
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={anchorEl ? true : false}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Regular dangerouslySetInnerHTML={{ __html: textContent }} sx={{ p: 1 }} />
            </Popover>
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IToolTips {
    children?: ReactNode;
    textContent: string;
}
// #endregion IPROPS --> //////////////////////////////////
