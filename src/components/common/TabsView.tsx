// #region IMPORTS -> /////////////////////////////////////
// #endregion IMPORTS -> //////////////////////////////////

import { Box, SxProps, Theme, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { ReactNode, useEffect, useState } from 'react';
import useNavigation from '~/hooks/useNavigation';
import { AppError, ErrorTypeEnum } from '~/core/appError';

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function TabsView({ width = 100, containerStyle, tabTitles, content }: ITab) {
    // #region STATE --> ///////////////////////////////////////
    const [currentIndex, setCurrentIndex] = useState<string>('0');
    const nav = useNavigation();
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setCurrentIndex(newValue);
    };

    const handleStartIndex = () => {
        if (nav.query && nav.query.tab) {
            if (parseInt(nav.query.tab as string) <= content.length - 1 && parseInt(nav.query.tab as string) >= 0) {
                setCurrentIndex(nav.query.tab as string);
            }
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        handleStartIndex();
        if (width > 100 || width < 0) {
            throw new AppError(ErrorTypeEnum.Functional, 'tabs view width cannot be bigger than 100 and shorter than 0');
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box sx={{ width: `${width}%`, ...containerStyle }}>
            <TabContext value={currentIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabTitles.map((titles, i) => {
                            return <Tab key={i} label={titles} value={i.toString()} />;
                        })}
                    </TabList>
                </Box>
                {content.map((element, i) => {
                    return (
                        <AppTabPanel key={i} value={currentIndex} index={i.toString()}>
                            {element}
                        </AppTabPanel>
                    );
                })}
            </TabContext>
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

function AppTabPanel({ children, value, index }) {
    return (
        <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            <Box className={`animate__animated animate__faster ${value === index ? 'animate__fadeIn' : 'animate__fadeOut'}`} sx={{ p: 3, display: value === index ? 'block' : 'none' }}>
                {children}
            </Box>
        </Box>
    );
}

// #region IPROPS -->  /////////////////////////////////////
interface ITab {
    width?: number;
    containerStyle?: SxProps<Theme>;
    tabTitles: string[];
    content: ReactNode[];
}
// #endregion IPROPS --> //////////////////////////////////
