
import AddTransaction from "./AddTransaction";


import {MenuButton} from "./ui/Button.styled";

export default function MyMenu() {

    return (
        <div>
            <div>
                <MenuButton variant={"myMenuBtn"}>Transaktion</MenuButton>
                <MenuButton variant={"myMenuBtn"}>Statistik</MenuButton>
                <MenuButton variant={"myMenuBtn"}>Einkommen</MenuButton>
                <MenuButton variant={"myMenuBtn"}>Ausgaben</MenuButton>
            </div>
            <AddTransaction/>
        </div>
    )
}
