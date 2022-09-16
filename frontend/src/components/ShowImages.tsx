import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import "./ShowImages.css"
import ButtonStyled from "./ui/Button.styled";
import {useNavigate} from "react-router-dom";

export default function ShowImages() {
    const {allTransactions} = useContext(TransactionContext);
    const navigate = useNavigate();

    return (
        <div className="showImages-CardContainer">
            <div className="showImages-header">
                <ButtonStyled variant={"home"} onClick={() => navigate("/home")}>Home</ButtonStyled>
                <h1>Bilder</h1>
            </div>

            {allTransactions.length !== 0 ? (
                allTransactions.map(t =>
                    <div key={t.id} className="showImages-card">
                        <img src={t.pictureId} alt=""/>
                    </div>
                )
            ) : (<p>Keine Transaktion vorhanden</p>)
            }
        </div>
    )
}
