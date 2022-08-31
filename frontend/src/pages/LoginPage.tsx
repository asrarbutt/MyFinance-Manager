import {Box, Button, TextField} from "@mui/material";
import {FormEvent, useContext, useState} from "react";
import AuthContext from "../context/authentication/AuthContext";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export default function LoginPage() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (username === "" || password === "") {
            toast.error("Please enter Username and Password")
        } else {
            login(username, password).then(() => {
                setPassword("");
                setUsername("");
                toast.success("Erfolgreich eingeloggt!")
                navigate("/home")
            }).catch(error => {
                toast.error(error.message)
            })
        }
    }

    return (
        <Box className="loginPage">
            <h1>Login</h1>

            <form onSubmit={handleSubmit} className="loginPage-form">
                <TextField required label="E-Mail" type="email" variant="filled" value={username}
                           onChange={e => setUsername(e.target.value)}/>
                <TextField required label="Password" type="password" variant="outlined"
                           onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" variant="outlined">Register</Button>
            </form>
        </Box>
    )
}