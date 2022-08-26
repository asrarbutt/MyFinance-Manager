import {createContext} from "react";


export interface IContext {
    register: (email: string, name: string, password: string, repeatPassword: string) => Promise<Response>;
}

export const AuthContext = createContext({} as IContext);

export default AuthContext;