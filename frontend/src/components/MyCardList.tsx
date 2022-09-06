import MyCard from "./MyCard";
import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import {Box} from "@mui/system";

export default function MyCardList() {

    const {deleteTransaction, allTransactions} = useContext(TransactionContext);

    return (
        <Box>
            <h1>Alle Transaktionen</h1>

            {
                allTransactions.length !== 0 ? (
                    allTransactions.map(t =>
                        <MyCard key={t.id} allTransaction={t} deleteTransaction={deleteTransaction}/>
                    )
                ) : (<p>Keine Transaktion vorhanden</p>)
            }

        </Box>

    );
}
