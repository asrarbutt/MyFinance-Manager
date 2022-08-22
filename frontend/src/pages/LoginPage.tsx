import {Box, Button, TextField} from "@mui/material";


export default function LoginPage() {


    return (
        <Box className="loginPage">
            <h1>Login</h1>

            <form className="loginPage-form">
                <TextField label="E-Mail" type="email" variant="filled"/>
                <TextField label="Password" type="password" variant="outlined"/>
                <Button type="submit" variant="outlined">Register</Button>
            </form>
        </Box>
    )
}