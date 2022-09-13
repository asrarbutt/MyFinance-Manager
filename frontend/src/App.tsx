import './App.css';

import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainStyled from "./components/ui/Main.styled";


function App() {

    return (
        <>
            <Header/>
            <MainStyled>
                <AllRoutes/>
            </MainStyled>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
