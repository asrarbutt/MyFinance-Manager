import {createContext} from "react";
import TransactionData from "../../model/TransactionData";


export interface IContext {
    getAllTransactions: () => Promise<TransactionData[]>;
}

export const TransactionContext = createContext({} as IContext);

export default TransactionContext;