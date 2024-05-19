import { PaletteMode, createTheme } from '@mui/material';

class StylesResources {
    private readonly AppThemeMode: PaletteMode = 'light';
    constructor() {
        const isDarkMode = JSON.parse(window.localStorage.getItem('darkMode'));
        if (isDarkMode) {
            this.AppThemeMode = isDarkMode ? 'dark' : 'light';
        }
    }
    public get theme() {
        return createTheme({
            components: {
                MuiAlert: {
                    defaultProps: {
                        variant: this.AppThemeMode === 'dark' ? 'filled' : 'standard',
                    },
                },
                MuiContainer: {
                    styleOverrides: {
                        root: {
                            '@media (min-width: 1200px)': {
                                maxWidth: 'unset',
                            },
                            paddingLeft: 0,
                            paddingRight: 0,
                            '@media (min-width: 600px)': {
                                paddingLeft: 0,
                                paddingRight: 0,
                            },
                        },
                    },
                },
                MuiToolbar: {
                    styleOverrides: {
                        root: {
                            minHeight: 0,
                            '@media (min-width: 600px)': {
                                minHeight: 0,
                            },
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        },
                    },
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            '&.Mui-error': {
                                ':required': {
                                    borderColor: '#C72824',
                                },
                            },
                        },
                    },
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '&.Mui-error': {
                                ':required': {
                                    borderColor: '#C72824',
                                },
                            },
                        },
                    },
                },
            },
            typography: {
                h1: { fontFamily: 'Montserrat' },
                fontFamily: ['Roboto', 'sans-serif', 'Segoe UI', 'Arial', 'Helvetica Neue', 'system-ui', '-apple-system'].join(','),
                fontSize: 12.5,
            },
            palette: {
                mode: this.AppThemeMode,
                primary: {
                    main: '#25639B',
                },
                secondary: {
                    main: '#6C757D',
                },
                success: {
                    main: '#12872B',
                },
                error: {
                    main: '#C72824',
                },
                warning: {
                    main: '#FFC007',
                },
                info: {
                    main: '#10CAF0',
                },
            },
        });
    }
}

export default new StylesResources();
