import React, {createContext} from "react";
import TransactionDto from "../../model/TransactionDto";


export interface IContext {

    deleteTransaction: (id: string) => void;
    setAllTransaction: React.Dispatch<React.SetStateAction<TransactionDto[]>>;
    allTransaction: TransactionDto[];
    getAllTransactions: () => void;
}

export const TransactionContext = createContext({} as IContext);

export default TransactionContext;