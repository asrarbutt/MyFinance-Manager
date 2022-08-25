import {Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";
import {FormEvent, useContext, useState} from "react";


import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/authentication/AuthContext";


export default function RegistrationsPage() {

    const navigate = useNavigate();
    const {register} = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userRepeatPassword, setUserRepeatPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        register(userEmail, userName, userPassword, userRepeatPassword).then(() => {
            if (userPassword !== userRepeatPassword)
                toast.error('Passwords do not match')

            setUserEmail("");
            setUserName("");
            setUserPassword("");
            setUserRepeatPassword("");
            setErrorMessage("")
            toast.success("Account Created!")
            navigate("/");
        })
            .catch(error => {
                setErrorMessage(error.response.data.message)
                toast.error(error.response.data.message);
                console.log(error.response.data.message)

            });
    }

    return (
        <Box className="signUp">
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>
            {errorMessage && <Box>{errorMessage}</Box>}

            <form onSubmit={handleSubmit} className="signUp-form">
                <TextField required label="E-Mail" type="email" variant="filled" value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}/>
                <TextField required label="Name" type="name" variant="outlined" value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>
                <TextField required label="Password" type="password" variant="outlined" value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}/>
                <TextField required label="Repeat Password" type="password" variant="outlined"
                           value={userRepeatPassword}
                           onChange={(e) => setUserRepeatPassword(e.target.value)}/>
                <Button type="submit" variant="outlined">Register</Button>

            </form>
        </Box>
    )
}
