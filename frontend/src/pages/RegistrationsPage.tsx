import {Alert, Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";
import {FormEvent, useContext, useState} from "react";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
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

        if (validateEmail(userEmail) && validatePasswords(userPassword, userRepeatPassword)) {

            register(userEmail, userName, userPassword, userRepeatPassword).then(() => {
                if (userPassword !== userRepeatPassword) {
                    toast.error('Passwords do not match')
                } else {
                    setUserEmail("");
                    setUserName("");
                    setUserPassword("");
                    setUserRepeatPassword("");
                    setErrorMessage("")
                    toast.success("Account Created!")
                    navigate("/auth/login");
                }
            })
                .catch(error => {
                    setErrorMessage(error.response.data.message)
                    toast.error(error.response.data.message);
                    console.log(error.response.data.message)
                });
        }
    }

    const validateEmail = (inputEmail: string) => {

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) {
            setErrorMessage("Email ist not valid")
        }
        setErrorMessage("");
        return true;
    }

    const validatePasswords = (password1: string, repeatPassword: string) => {
        if (password1 === "" || repeatPassword === "") {
            setErrorMessage("Password/confirm Password is required")
            return false
        }

        if (password1.length < 6) {
            setErrorMessage("Password to short minimum 6 Characters")
            return false
        }

        if (!/[a-z]/.test(password1)) {
            setErrorMessage("minimum one lowercase Character required")
            return false
        }

        if (!/[A-Z]/.test(password1)) {
            setErrorMessage("minimum one Uppercase Character required")
            return false
        }

        if (password1 !== repeatPassword) {
            setErrorMessage("Passwords do not match")
            return false
        }

        setErrorMessage("")
        return true;
    }

    return (
        <Box className="signUp" sx={{boxShadow: "0 0.1rem 0.2rem rgba(0, 0, 0, 0.5)"}}>
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
                <Link to="/auth/login">Back to login</Link>
            </form>
        </Box>
    )
}
