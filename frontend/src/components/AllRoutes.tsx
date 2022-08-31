import {Route, Routes} from "react-router-dom";
import RegistrationsPage from "../pages/RegistrationsPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";

export default function AllRoutes() {


    return (
        <>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/auth/login"} element={<LoginPage/>}/>
                <Route path={"/auth/register"} element={<RegistrationsPage/>}/>
            </Routes>
        </>
    )

}
