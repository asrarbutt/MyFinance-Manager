import {createContext} from "react";


export interface IContext {
    register: (email: string, name: string, password: string, repeatPassword: string) => Promise<Response>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export default createContext({} as IContext);