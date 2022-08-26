import axios from "axios";
import UserRegisterData from "../../model/UserRegisterData";
import AuthContext from "./AuthContext";

interface Param {
    children?: any;
}

export default function AuthProvider({children}: Param) {

    const register = (email: string, name: string, password: string, repeatPassword: string) => {
        const newUser: UserRegisterData = {
            "email": email,
            "name": name,
            "password": password,
            "repeatPassword": repeatPassword
        }
        return axios.post("/auth/register", newUser).then(response => response.data)
    }

    return (
        <AuthContext.Provider value={{register}}>

            {children}
        </AuthContext.Provider>
    )
}

