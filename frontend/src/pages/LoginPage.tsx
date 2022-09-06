import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import {FormEvent, useContext, useState} from "react";
import AuthContext from "../context/authentication/AuthContext";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useTheme} from "@mui/material/styles";


export default function LoginPage() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const theme = useTheme();

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
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, background: theme.palette.linkButtonColor}}>
                    <LockOutlinedIcon fontSize='large'/>
                </Avatar>
                <Typography component="h1" variant="h3">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        variant="filled"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button startIcon={<LockOutlinedIcon/>}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                    >
                        <Typography fontSize='large'>
                            Login
                        </Typography>
                    </Button>
                    <Grid item>
                        <Link to="/auth/register">{"Don't have an account? Sign Up"}</Link>
                    </Grid>
                </Box>
            </Box>

        </Container>
    )
}
