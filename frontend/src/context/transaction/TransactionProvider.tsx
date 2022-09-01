import axios from "axios";
import TransactionContext from "./TransactionContext";
import {toast} from "react-toastify";
import TransactionDto from "../../model/TransactionDto";


interface Param {
    children?: any;
}

export default function TransactionProvider({children}: Param) {

    const getAllTransactions = () => {
        return axios.get("/transactions").then((response) => {
            return response.data
        })
    }

    const addTransaction = (userEmail: string,
                            description: string,
                            amount: number,
                            category: string,
                            transactionDate: number | null,
                            isIncome: boolean,
                            pictureId: string) => {

        const newTransaction = {
            "userEmail": userEmail,
            "description": description,
            "amount": amount,
            "category": category,
            "transactionDate": transactionDate,
            "isIncome": isIncome,
            "pictureId": pictureId,
        }

        return axios.post("/transactions", newTransaction)
            .then(response => response.data).then(getAllTransactions)
    }

    const deleteTransaction = (id: string) => {
        return axios.delete(`/transactions/${id}`)
            .then(getAllTransactions)
            .then(() => toast.success(`Transaktion wurde gelöscht`))
            .catch(error => toast.error(error.message))
    }

    const updateTransaction = (transactionToUpdate: TransactionDto) => {

        const updatedTransaction = {
            "userEmail": transactionToUpdate.userEmail,
            "description": transactionToUpdate.description,
            "amount": transactionToUpdate.amount,
            "category": transactionToUpdate.category,
            "transactionDate": transactionToUpdate.transactionDate,
            "isIncome": transactionToUpdate.isIncome,
            "pictureId": transactionToUpdate.pictureId,
        }

        return axios.put(`/api/plants/${transactionToUpdate.id}`, updatedTransaction)
            .then(getAllTransactions)
    }

    return (
        <TransactionContext.Provider value={{getAllTransactions, addTransaction, deleteTransaction, updateTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}
