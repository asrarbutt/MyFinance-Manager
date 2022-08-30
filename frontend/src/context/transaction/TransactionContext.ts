import {createContext} from "react";
import TransactionData from "../../model/TransactionData";


export interface IContext {
    getAllTransactions: () => Promise<TransactionData[]>;
    addTransaction: (userEmail: string, description: string, amount: number, category: string, transactionDate: number | null, isIncome: boolean) => Promise<TransactionData>;


}

export const TransactionContext = createContext({} as IContext);

export default TransactionContext;