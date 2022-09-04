import MyCard from "./MyCard";
import {useContext, useEffect, useState} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import {toast} from "react-toastify";
import TransactionDto from "../model/TransactionDto";
import {Box} from "@mui/system";


export default function MyCardList() {

    const {getAllTransactions, deleteTransaction} = useContext(TransactionContext);

    const [allTransactions, setAllTransactions] = useState<TransactionDto[]>([]);

    useEffect(() => {

        getAllTransactions()
            .then(data => {
                return setAllTransactions(data)
            })
            .catch(error => {
                toast.error(error.message)
            });

    }, [])// eslint-disable-line

    return (
        <Box>
            <h1>Alle Transaktionen</h1>

            {
                allTransactions.length !== 0 ? (
                    allTransactions.map(t =>
                        <MyCard allTransaction={t} deleteTransaction={deleteTransaction}/>
                    )
                ) : (<h1>Keine Transaktion vorhanden</h1>)
            }


        </Box>

    );
}
