import MyMenu from "../components/MyMenu";
import MyCardList from "../components/MyCardList";
import {HomeContainerStyled} from "../components/ui/CommonContainer.styled";
import ShowIncomeExpanse from "../components/ShowIncomeExpanse";

type HomeProps = {
    sumOfIncome: number,
    sumOfExpanse: number
}

export default function Home(props: HomeProps) {

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
