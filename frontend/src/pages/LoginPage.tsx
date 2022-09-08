import {FormEvent, useContext, useState} from "react";
import AuthContext from "../context/authentication/AuthContext";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import TransactionContext from "../context/transaction/TransactionContext";
import CommonContainerStyled, {
    FormInputContainer,
    HomeContainerStyled,
    MainContainer,
} from "../components/ui/CommonContainer.styled";
import {WelcomeTitle} from "../components/ui/Title.styled";
import ButtonStyled from "../components/ui/Button.styled";
import {TextField} from "@mui/material";


export default function LoginPage() {

    const {login} = useContext(AuthContext);
    const {getAllTransactions} = useContext(TransactionContext);
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
                getAllTransactions();
                navigate("/home")

            }).catch(error => {
                toast.error(error.message)
            })
        }
    }

    return (
        <MainContainer>
            <HomeContainerStyled>
                <WelcomeTitle>Login</WelcomeTitle>
            </HomeContainerStyled>
            <FormInputContainer onSubmit={handleSubmit}>
                <TextField
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    label="E-Mail"
                />
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    label="Password"/>
                <ButtonStyled variant={"login"}>Login</ButtonStyled>
            </FormInputContainer>
            <CommonContainerStyled>
                <Link to="/auth/register">{"Don't have an account? Sign Up"}</Link>
            </CommonContainerStyled>
        </MainContainer>
    )
}
