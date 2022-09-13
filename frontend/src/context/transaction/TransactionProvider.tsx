import axios from "axios";
import TransactionContext from "./TransactionContext";
import {toast} from "react-toastify";
import TransactionDto from "../../model/TransactionDto";
import {useEffect, useState} from "react";


interface Param {
    children?: any;
}

export default function TransactionProvider({children}: Param) {

    const [allTransactions, setAllTransactions] = useState<TransactionDto[]>([]);

    useEffect(() => {
        getAllTransactions();
    }, [])

    const getAllTransactions = () => {
        return axios.get("/api/transactions")
            .then((response) => response.data)
            .then(setAllTransactions)
    }

    const deleteTransaction = (id: string) => {
        return axios.delete(`/api/transactions/${id}`)
            .then(getAllTransactions)
            .then(() => toast.success("Transaction deleted"))
            .catch(error => toast.error(error.message))
    }

    return (
        <TransactionContext.Provider
            value={{deleteTransaction, setAllTransactions, allTransactions, getAllTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}
