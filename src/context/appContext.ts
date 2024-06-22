import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction, createContext } from 'react';

interface IAppContext {
    isNoAccess: boolean;
    setIsNoAccess?: Dispatch<SetStateAction<boolean>>;
}

const initialContext: IAppContext = {
    isNoAccess: false,
};

export type AlertContextType = {
    severity: AlertColor;
    title: string;
    subtitle?: string;
};

const AppContext = createContext<IAppContext>(initialContext);
export default AppContext;
