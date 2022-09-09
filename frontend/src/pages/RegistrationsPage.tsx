import {Alert, Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
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

                setUserEmail("");
                setUserName("");
                setUserPassword("");
                setUserRepeatPassword("");
                setErrorMessage("")
                toast.success("Account Created!")
                navigate("/auth/login");

            })
                .catch(error => {
                    setErrorMessage(error.response.data.message)
                    console.log(error.response.data.message)
                });
        }
    }

    const validateEmail = (inputEmail: string) => {

        let emailRegExpression = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";


        if (!emailRegExpression.match(inputEmail)) {
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
            setErrorMessage("Password too short minimum 6 Characters")
            return false
        }

        if (!/[a-z]/.test(password1)) {
            setErrorMessage("lowercase letter required")
            return false
        }

        if (!/[A-Z]/.test(password1)) {
            setErrorMessage("uppercase letter required")
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
        <Container component='main' maxWidth="sm" className="signUp">
            <CssBaseline>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '3rem'
                }}>
                    <Typography color={'primary'} variant='h3'>Registrieren</Typography>
                    <Typography variant='h6'>schnell, einfach und kostenlos</Typography>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Box>

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
                    <Button sx={{background: 'primary'}} type="submit" variant="contained">Register</Button>
                    <Link to="/auth/login">Back to login</Link>
                </form>
            </CssBaseline>
        </Container>
    )
}
