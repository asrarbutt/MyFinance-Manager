import AddTransaction from "./AddTransaction";
import {MenuButton} from "./ui/Button.styled";
import {useNavigate} from "react-router-dom";

export default function MyMenu() {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <MenuButton variant={"myMenuBtn"}>Transaktion</MenuButton>
                <MenuButton variant={"myMenuBtn"} onClick={() => navigate("/users/statistic")}>Statistik</MenuButton>
                <MenuButton variant={"myMenuBtn"}>Einkommen</MenuButton>
                <MenuButton variant={"myMenuBtn"}>Ausgaben</MenuButton>
            </div>
            <AddTransaction/>
        </div>
    )
}
