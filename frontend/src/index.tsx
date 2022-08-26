import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import AuthProvider from "./context/authentication/AuthProvider";
import TransactionProvider from "./context/transaction/TransactionProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>

        <HashRouter>
            <AuthProvider>
                <TransactionProvider>
                    <App/>
                </TransactionProvider>
            </AuthProvider>

        </HashRouter>


    </React.StrictMode>
);

