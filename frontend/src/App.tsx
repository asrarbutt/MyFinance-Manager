import './App.css';

import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
        <>
            <Header/>
            <AllRoutes/>
            <ToastContainer/>
        </>

    );
}

export default App;
