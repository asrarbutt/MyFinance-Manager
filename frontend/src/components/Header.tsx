import MyNavBar from "./MyNavBar";
import {useContext} from "react";
import AuthContext from "../context/authentication/AuthContext";

export default function Header() {
    const {userLoggedIn, logout} = useContext(AuthContext);


    return (

        <header>
            <MyNavBar loggedInUser={userLoggedIn} logout={logout}/>
        </header>
    )

}