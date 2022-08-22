import {Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";
import {FormEvent} from "react";

export default function RegistrationsPage() {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }


    return (
        <Box className="signUp">
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>

            <form onSubmit={handleSubmit} className="signUp-form">
                <TextField label="E-Mail" type="email" variant="filled"/>
                <TextField label="Name" type="name" variant="outlined"/>
                <TextField label="Password" type="password" variant="outlined"/>
                <TextField label="Repeat Password" type="password" variant="outlined"/>
                <Button type="submit" variant="outlined">Register</Button>

            </form>
        </Box>
    )
}