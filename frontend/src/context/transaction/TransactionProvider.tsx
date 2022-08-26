import axios from "axios";
import TransactionContext from "./TransactionContext";


interface Param {
    children?: any;
}

export default function TransactionProvider({children}: Param) {

    const getAllTransactions = () => {


        return axios.get("/transaction").then((response) => {
            return response.data
        })

    }

    return (

        <TransactionContext.Provider value={{getAllTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}

