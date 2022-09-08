import PieChart from "../components/PieChart";
import "./Statistic.css"
import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";

export default function Statistic() {

    const {allTransactions} = useContext(TransactionContext);
    const transactionstypeCategory = ["Einkommen", "Ausgabe"]

    const grouped = Array.from(
        allTransactions
            .reduce(
                (m, {category, amount}) =>
                    m.set(category, (m.get(category) || 0) + amount), new Map()),
        ([key, val]) => ({key, val})
    );

    const amounts = grouped
        .filter(t => t.val)
        .map(t => t.val);

    const groupedCategory = grouped
        .filter(t => t.key)
        .map(t => t.key);

    const sumOfExpanse = allTransactions
        .filter(t => (!t.isIncome))
        .map(t => t.amount)
        .reduce((a, b) => a + b, 0);

    const sumOfIncome = allTransactions
        .filter(t => t.isIncome)
        .map(t => t.amount)
        .reduce((a, b) => a + b, 0);

    const sumOfIncomeAndExpanse = Array.of(sumOfIncome, sumOfExpanse);

    return (
        <div className="statistic">
            <header>
                <h1>Ein- und Ausgabebericht</h1>
            </header>

            <section className="statistic-section">
                <div className="statistic-incomeExpanse">
                    <div className="statistic-showIncome">
                        <p>Einkommen</p>
                        <p>{sumOfIncome} €</p>
                    </div>
                    <div className="statistic-showExpanse">
                        <p>Ausgaben</p>
                        <p>{sumOfExpanse} €</p>
                    </div>
                </div>

                <div className="statistic-charts">
                    <div>

                        {amounts.length !== 0 ? (
                                <>
                                    <p>Ausgaben nach Kategorien</p>
                                    <PieChart allTransactions={allTransactions} transactionsType={groupedCategory}
                                              amounts={amounts}/>
                                </>
                            )
                            : <p>Keine Transaktionen vorhanden</p>
                        }
                    </div>
                    <div>
                        {amounts.length !== 0 ? (
                                <>
                                    <p>Einkommen und Ausgaben</p>
                                    <PieChart allTransactions={allTransactions} transactionsType={transactionstypeCategory}
                                              amounts={sumOfIncomeAndExpanse}/>
                                </>
                            )
                            : <p>Kein Transaktionen vorhanden</p>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
