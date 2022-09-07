import './App.css';

import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainStyled from "./components/ui/Main.styled";
import HeaderStyled from "./components/ui/Header.styled";


function App() {

    return (
        <>
            <HeaderStyled>
                <Header/>
            </HeaderStyled>
            <MainStyled>
                <AllRoutes/>
            </MainStyled>
            <ToastContainer/>
        </>
    );
}

export default App;
