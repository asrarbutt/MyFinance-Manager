import MyMenu from "../components/MyMenu";
import MyCardList from "../components/MyCardList";
import {HomeContainerStyled} from "../components/ui/CommonContainer.styled";


export default function Home() {

    return (
        <HomeContainerStyled>
            <MyMenu/>
            <MyCardList/>
        </HomeContainerStyled>
    )
}
