import MyCardList from "../components/MyCardList";
import {HomeContainerStyled} from "../components/ui/CommonContainer.styled";
import {useContext, useEffect} from "react";
import AuthContext from "../context/authentication/AuthContext";
import {useNavigate} from "react-router-dom";

type HomeProps = {
    sumOfIncome: number,
    sumOfExpanse: number
}

export default function Home(props: HomeProps) {
    const {loggedInUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser === "anonymousUser") {
            navigate("/auth/login")
        }

    }, [loggedInUser]) // eslint-disable-line

    return (
        <HomeContainerStyled>
            <MyCardList
                sumOfExpanse={props.sumOfExpanse}
                sumOfIncome={props.sumOfIncome}
            />
        </HomeContainerStyled>
    )
}
