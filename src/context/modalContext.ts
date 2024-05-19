import { Breakpoint, DialogProps } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';

interface IModalContext {
    isOpen: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    title: string;
    setTitle?: Dispatch<SetStateAction<string>>;
    content: ReactNode;
    setContent?: Dispatch<SetStateAction<ReactNode>>;
    options: AppModalProperty;
    setOptions?: Dispatch<SetStateAction<AppModalProperty>>;
}

const initialContext: IModalContext = {
    isOpen: false,
    title: '',
    content: null,
    options: { size: 'md', scroll: 'paper', persistant: false },
};

export type AppModalProperty = {
    size?: Breakpoint;
    scroll?: DialogProps['scroll'];
    persistant?: boolean;
};

const ModalContext = createContext<IModalContext>(initialContext);
export default ModalContext;
