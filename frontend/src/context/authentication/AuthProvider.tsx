import axios from "axios";
import UserRegisterData from "../../model/UserRegisterData";
import AuthContext from "./AuthContext";
import {useState} from "react";

interface Param {
    children?: any;
}

export default function AuthProvider({children}: Param) {

    const [loggedInUser, setLoggedInUser] = useState<string>("anonymousUser");


    const register = (email: string, name: string, password: string, repeatPassword: string) => {
        const newUser: UserRegisterData = {
            "email": email,
            "name": name,
            "password": password,
            "repeatPassword": repeatPassword
        }
        return axios.post("/auth/register", newUser).then(response => response.data)
    }

    const login = (username: string, password: string) => {

        return axios.get("/auth/login",
            {auth: {username, password}})
            .then(response => {
                setLoggedInUser(response.data)
                return response.data
            })

    }

    const logout = () => {

        axios.get("/auth/logout")
            .then(response => response.data)
            .then(() => {
                setLoggedInUser("anonymousUser")
            })
    }


    return (
        <AuthContext.Provider value={{register, login, logout, loggedInUser, setLoggedInUser}}>

            {children}
        </AuthContext.Provider>
    )
}

