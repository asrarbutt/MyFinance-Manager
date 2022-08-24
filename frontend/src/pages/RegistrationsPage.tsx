import {Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";
import {FormEvent, useState} from "react";

import axios from "axios";
import {toast} from "react-toastify";
import UserRegisterData from "../model/UserRegisterData";
import {useNavigate} from "react-router-dom";

export default function RegistrationsPage() {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userRepeatPassword, setUserRepeatPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (userPassword === userRepeatPassword)
            toast.error("Passwords not match")

        const newUser: UserRegisterData = {
            "email": userEmail,
            "name": userName,
            "password": userPassword,

        }

        axios.post("/auth/register", newUser)
            .then((reponse) => reponse.data)
            .then(() => {
                setUserEmail("");
                setUserName("");
                setUserPassword("");
                setUserRepeatPassword("");
                setErrorMessage("")
                toast.success("Account Created!")
                navigate("/");
            })
            .catch(error => {
                setErrorMessage(error.response.data.error)
                toast.error(error.response.data.error);

            })
    }


    return (
        <Box className="signUp">
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>
            <Box sx={{mt: 4}}>{errorMessage}</Box>

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
