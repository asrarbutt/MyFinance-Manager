import {createContext} from "react";


export interface IContext {
    register: (email: string, name: string, password: string, repeatPassword: string) => Promise<Response>;
    login: (username: string, password: string) => Promise<void>;
    userLoggedIn: string;
    logout: () => void;

}

export const AuthContext = createContext({} as IContext);

export default AuthContext;