import axios from "axios";
import TransactionContext from "./TransactionContext";
import {toast} from "react-toastify";
import TransactionDto from "../../model/TransactionDto";
import {useEffect, useState} from "react";


interface Param {
    children?: any;
}

export default function TransactionProvider({children}: Param) {

    const [allTransaction, setAllTransaction] = useState<TransactionDto[]>([]);

    useEffect(() => {
        getAllTransactions();
    }, [])

    const getAllTransactions = () => {
        return axios.get("/api/transactions")
            .then((response) => {
                return response.data
            })
            .then(data => setAllTransaction(data))
    }

    const deleteTransaction = (id: string) => {
        return axios.delete(`/api/transactions/${id}`)
            .then(getAllTransactions)
            .then(() => toast.success(`Transaktion wurde gelöscht`))
            .catch(error => toast.error(error.message))
    }

    return (
        <TransactionContext.Provider
            value={{deleteTransaction, setAllTransaction, allTransaction, getAllTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}
