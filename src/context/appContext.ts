import { Dispatch, SetStateAction, createContext } from 'react';

interface IAppContext {
    isNoAccess: boolean;
    setIsNoAccess?: Dispatch<SetStateAction<boolean>>;
}

const initialContext: IAppContext = {
    isNoAccess: false,
};

const AppContext = createContext<IAppContext>(initialContext);
export default AppContext;
