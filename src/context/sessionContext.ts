import { Dispatch, SetStateAction, createContext } from 'react';
import { UserAccessLevel } from '~/models/users';

interface ISessionContext {
    id: string;
    setId?: Dispatch<SetStateAction<string>>;
    name: string;
    setName?: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail?: Dispatch<SetStateAction<string>>;
    mobile?: string;
    setMobile?: Dispatch<SetStateAction<string>>;
    level: UserAccessLevel;
    setLevel?: Dispatch<SetStateAction<UserAccessLevel>>;
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
    name: null,
    email: null,
    mobile: null,
    level: UserAccessLevel.VISITOR,
    ip: null,
    lang: 'fr',
    token: null,
    tokenExpire: new Date(Date.now()),
};

const SessionContext = createContext<ISessionContext>(initialContext);

export default SessionContext;
