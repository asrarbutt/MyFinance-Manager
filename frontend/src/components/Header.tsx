import MyNavBar from "./MyNavBar";
import {useContext} from "react";
import AuthContext from "../context/authentication/AuthContext";

export default function Header() {
    const {loggedInUser, logout} = useContext(AuthContext);

    return (

        <header>
            <MyNavBar loggedInUser={loggedInUser} logout={logout}/>
        </header>
    )

}
