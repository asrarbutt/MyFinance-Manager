import {Box, Button, TextField} from "@mui/material";
import "./RegistrationsPage.css";

export default function RegistrationsPage() {


    return (
        <Box className="signUp">
            <h1>Registrieren</h1>
            <h3>Es geht schnell, einfach und kostenlos</h3>

            <form className="signUp-form">
                <TextField label="E-Mail" type="email" variant="filled"/>
                <TextField label="Name" type="name" variant="outlined"/>
                <TextField label="Password" type="password" variant="outlined"/>
                <TextField label="Repeat Password" type="password" variant="outlined"/>
                <Button type="submit" variant="outlined">Register</Button>

            </form>
        </Box>
    )
}