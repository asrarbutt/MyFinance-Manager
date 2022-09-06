import React, {createContext} from "react";
import TransactionDto from "../../model/TransactionDto";


export type ITransactionsContext = {

    deleteTransaction: (id: string) => void;
    setAllTransactions: React.Dispatch<React.SetStateAction<TransactionDto[]>>;
    allTransactions: TransactionDto[];
    getAllTransactions: () => void;
}

export const TransactionContext = createContext<ITransactionsContext>({} as ITransactionsContext);

export default TransactionContext;