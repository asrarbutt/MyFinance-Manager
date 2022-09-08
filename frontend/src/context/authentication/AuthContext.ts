import React, {createContext} from "react";

export type IUserContext = {
    register: (email: string, name: string, password: string, repeatPassword: string) => Promise<Response>;
    login: (username: string, password: string) => Promise<void>;
    setLoggedInUser: React.Dispatch<React.SetStateAction<string>>;
    loggedInUser: string;
    logout: () => void;
}

export const AuthContext = createContext<IUserContext>({} as IUserContext);
export default AuthContext;
