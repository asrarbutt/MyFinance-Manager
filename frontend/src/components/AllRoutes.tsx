import {Route, Routes} from "react-router-dom";
import RegistrationsPage from "../pages/RegistrationsPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Statistic from "../pages/Statistic";

export default function AllRoutes() {


    return (
        <>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/users/statistic"} element={<Statistic/>}/>
                <Route path={"/auth/login"} element={<LoginPage/>}/>
                <Route path={"/auth/register"} element={<RegistrationsPage/>}/>
            </Routes>
        </>
    )

}
