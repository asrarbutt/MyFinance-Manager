import {Route, Routes} from "react-router-dom";
import RegistrationsPage from "../pages/RegistrationsPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";

export default function AllRoutes() {


    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/auth/login"} element={<LoginPage/>}/>
                <Route path={"/auth/register"} element={<RegistrationsPage/>}/>
            </Routes>

        </>
    )

}