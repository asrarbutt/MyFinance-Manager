import MyMenu from "../components/MyMenu";
import MyCardList from "../components/MyCardList";
import {HomeContainerStyled} from "../components/ui/CommonContainer.styled";
import ShowIncomeExpanse from "../components/ShowIncomeExpanse";

type HomeProsp = {
    sumOfIncome: number,
    sumOfExpanse: number
}

export default function Home(props: HomeProsp) {

    return (
        <HomeContainerStyled>
            <MyMenu/>
            <ShowIncomeExpanse
                sumOfIncome={props.sumOfIncome}
                sumOfExpanse={props.sumOfExpanse}
            />
            <MyCardList/>
        </HomeContainerStyled>
    )
}
