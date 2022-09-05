import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import AuthProvider from "./context/authentication/AuthProvider";
import TransactionProvider from "./context/transaction/TransactionProvider";
import {ThemeProvider} from "@mui/material/styles";
import {myTheme} from "./GlobleTheme/customTheme";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>

        <ThemeProvider theme={myTheme}>
            <HashRouter>
                <AuthProvider>
                    <TransactionProvider>
                        <App/>
                    </TransactionProvider>
                </AuthProvider>

            </HashRouter>

        </ThemeProvider>


    </React.StrictMode>
);

