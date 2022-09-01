import {createContext} from "react";
import TransactionCreationDto from "../../model/TransactionCreationDto";
import TransactionDto from "../../model/TransactionDto";


export interface IContext {
    getAllTransactions: () => Promise<TransactionDto[]>;
    addTransaction: (userEmail: string, description: string, amount: number, category: string, transactionDate: number | null, isIncome: boolean, pictureId: string) => Promise<TransactionCreationDto>;
    deleteTransaction: (id: string) => void;
    updateTransaction: (transactionToUpdate: TransactionDto) => Promise<void>;

}

export const TransactionContext = createContext({} as IContext);

export default TransactionContext;