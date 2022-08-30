import axios from "axios";
import TransactionContext from "./TransactionContext";


interface Param {
    children?: any;
}

export default function TransactionProvider({children}: Param) {

    const getAllTransactions = () => {
        return axios.get("/transactions").then((response) => {
            return response.data
        })
    }

    const addTransaction = (userEmail: string, description: string, amount: number, category: string, transactionDate: number | null, isIncome: boolean) => {

        const newTransaction = {

            "userEmail": userEmail,
            "description": description,
            "amount": amount,
            "category": category,
            "transactionDate": transactionDate,
            "isIncome": isIncome,
        }

        return axios.post("/transactions", newTransaction)
            .then(response => response.data).then(getAllTransactions)

    }

    return (

        <TransactionContext.Provider value={{getAllTransactions, addTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}

