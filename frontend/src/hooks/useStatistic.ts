import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";

export default function useStatistic() {
    const {allTransactions} = useContext(TransactionContext);

    const grouped = Array.from(
        allTransactions
            .reduce(
                (m, {category, amount}) =>
                    m.set(category, (m.get(category) || 0) + amount), new Map<string, number>()),
        ([key, val]) => ({key, val})
    );

    const amounts = grouped
        .filter(t => t.val)
        .map(t => t.val);

    const groupedCategory = grouped
        .filter(t => t.key)
        .map(t => t.key);

    const sumOfExpanse = allTransactions
        .filter(t => !t.isIncome)
        .map(t => t.amount)
        .reduce((a, b) => a + b, 0);

    const sumOfIncome = allTransactions
        .filter(t => t.isIncome)
        .map(t => t.amount)
        .reduce((a, b) => a + b, 0);

    const sumOfIncomeAndExpanse = Array.of(sumOfIncome, sumOfExpanse);

    return {amounts, groupedCategory, sumOfExpanse, sumOfIncome, sumOfIncomeAndExpanse}
}
