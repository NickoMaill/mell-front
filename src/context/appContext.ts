import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction, createContext } from 'react';
import { AppError } from '~/core/appError';

interface IAppContext {
    isNoAccess: boolean;
    setIsNoAccess?: Dispatch<SetStateAction<boolean>>;
    error: AppError;
    setError?: Dispatch<SetStateAction<AppError>>;
}

const initialContext: IAppContext = {
    isNoAccess: false,
    error: null,
};

export type AlertContextType = {
    severity: AlertColor;
    title: string;
    subtitle?: string;
};

const AppContext = createContext<IAppContext>(initialContext);
export default AppContext;
