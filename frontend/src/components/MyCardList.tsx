import MyCard from "./MyCard";
import {useContext} from "react";
import {Box} from "@mui/system";
import TransactionContext from "../context/transaction/TransactionContext";

export default function MyCardList() {

    const {deleteTransaction, allTransaction} = useContext(TransactionContext);

    return (
        <Box>
            <h1>Alle Transaktionen</h1>

            {
                allTransaction.length !== 0 ? (
                    allTransaction.map(t =>
                        <MyCard key={t.id} allTransaction={t} deleteTransaction={deleteTransaction}/>
                    )
                ) : (<h1>Keine Transaktion vorhanden</h1>)
            }

        </Box>

    );
}
