import {Navigate, Route, Routes} from "react-router-dom";
import RegistrationsPage from "../pages/RegistrationsPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Statistic from "../pages/Statistic";
import useStatistic from "../hooks/useStatistic";

export default function AllRoutes() {

    const serviceHook = useStatistic();

    return (
        <>
            <Routes>
                <Route path={"*"} element={
                    <Navigate to={"/"} replace/>
                }/>
                <Route
                    path={"/"}
                    element={<LandingPage/>}
                />
                <Route
                    path={"/home"}
                    element={<Home
                        sumOfExpanse={serviceHook.sumOfExpanse}
                        sumOfIncome={serviceHook.sumOfIncome}/>}
                />
                <Route
                    path={"/users/statistic"}
                    element={<Statistic
                        amounts={serviceHook.amounts}
                        groupedCategory={serviceHook.groupedCategory}
                        sumOfExpanse={serviceHook.sumOfExpanse}
                        sumOfIncome={serviceHook.sumOfIncome}
                        sumOfIncomeAndExpanse={serviceHook.sumOfIncomeAndExpanse}/>}
                />
                <Route
                    path={"/auth/login"}
                    element={<LoginPage/>}
                />
                <Route
                    path={"/auth/register"}
                    element={<RegistrationsPage/>}
                />
            </Routes>
        </>
    )
}
