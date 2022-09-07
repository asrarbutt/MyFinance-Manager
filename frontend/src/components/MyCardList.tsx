import MyCard from "./MyCard";
import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import TransactionsContainerStyled from "./ui/TransactionsContainer.styled";
import TitleStyled from "./ui/Title.styled";

export default function MyCardList() {

    const {deleteTransaction, allTransactions} = useContext(TransactionContext);

    return (
        <TransactionsContainerStyled>
            <TitleStyled>Alle Transaktionen</TitleStyled>
            {
                allTransactions.length !== 0 ? (
                    allTransactions.map(t =>
                        <MyCard key={t.id} allTransaction={t} deleteTransaction={deleteTransaction}/>
                    )
                ) : (<p>Keine Transaktion vorhanden</p>)
            }
        </TransactionsContainerStyled>

    );
}
