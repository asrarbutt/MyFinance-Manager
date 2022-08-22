import {Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";
import {FormEvent, useState} from "react";

import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

export default function RegistrationsPage() {

    const [userEmail, setUserEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userRepeatPassword, setUserRepeatPassword] = useState<string>("");
    const [, setEmailError] = useState<string>("");
    const [, setPasswordError] = useState<string>("");
    const [, setLoading] = useState(true || false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();


        if (emailValidation(userEmail) && validatePasswords(userPassword, userRepeatPassword)) {
            setLoading(true)

            const newUser = {
                "email": userEmail,
                "name": userName,
                "password": userPassword
            }

            axios.post("/auth/register", newUser)
                .then((reponse) => reponse.data)
                .then((data) => data)
                .catch(error => {
                    if (error.response?.message !== undefined) {
                        toast(error.response.message);
                        console.log(error)
                    }
                })
                .finally(() => setLoading(false));

        }


    }

    const emailValidation = (userMail: string) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userMail)) {
            setEmailError("Email not valid")
            return false
        }
        setEmailError("");
        return true;
    }

    const validatePasswords = (password: string, repeatPassword: string) => {
        if (password.length < 6) {
            setPasswordError("Password too short")
            return false
        }
        if (password.length > 100) {
            setPasswordError("Password too long")
            return false
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("lowercase letter required")
            return false
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("uppercase letter required")
            return false
        }
        if (!/\d/.test(password)) {
            setPasswordError("number required")
            return false
        }
        if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) {
            setPasswordError("special character required")
            return false
        }
        if (password !== repeatPassword) {
            setPasswordError("Passwords do not match")
            return false
        }

        setPasswordError("")
        return true
    }


    return (
        <Box className="signUp">
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>

            <form onSubmit={handleSubmit} className="signUp-form">
                <TextField label="E-Mail" type="email" variant="filled" value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}/>
                <TextField label="Name" type="name" variant="outlined" value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>
                <TextField label="Password" type="password" variant="outlined" value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}/>
                <TextField label="Repeat Password" type="password" variant="outlined" value={userRepeatPassword}
                           onChange={(e) => setUserRepeatPassword(e.target.value)}/>
                <Button type="submit" variant="outlined">Register</Button>

            </form>
            <ToastContainer/>
        </Box>
    )
}