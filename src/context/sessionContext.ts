import { Dispatch, SetStateAction, createContext } from 'react';

interface ISessionContext {
    id: string;
    setId?: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername?: Dispatch<SetStateAction<string>>;
    fullName: string;
    setFullName?: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    phone?: string;
    setPhone?: Dispatch<SetStateAction<string>>;
    gear: string;
    setGear?: Dispatch<SetStateAction<string>>;
    ip: string;
    setIp?: Dispatch<SetStateAction<string>>;
    lang: 'fr' | 'en';
    setLang?: Dispatch<SetStateAction<'fr' | 'en'>>;
    token?: string;
    setToken?: Dispatch<SetStateAction<string>>;
    tokenExpire: Date;
    setTokenExpire?: Dispatch<SetStateAction<Date>>;
}

const initialContext: ISessionContext = {
    id: null,
    username: null,
    fullName: null,
    email: null,
    phone: null,
    gear: null,
    ip: null,
    lang: 'fr',
    token: null,
    tokenExpire: new Date(Date.now()),
};

const SessionContext = createContext<ISessionContext>(initialContext);

export default SessionContext;
