import MyCard from "./MyCard";
import {useContext, useEffect, useState} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import {toast} from "react-toastify";
import TransactionData from "../model/TransactionData";

export default function MyCardList() {

    const {getAllTransactions} = useContext(TransactionContext);

    const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);

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
        <>
            {
                allTransactions.length !== 0 ? (
                    allTransactions.map(t =>
                        <MyCard allTransaction={t}/>
                    )
                ) : (<h1>Keine Transaktion vorhanden</h1>)
            }


        </>

    );


}