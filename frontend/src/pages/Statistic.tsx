import PieChart from "../components/PieChart";
import "./Statistic.css"
import {useContext} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import ShowIncomeExpanse from "../components/ShowIncomeExpanse";

type StatisticProps = {
    amounts: number[],
    groupedCategory: string[],
    sumOfExpanse: number,
    sumOfIncome: number,
    sumOfIncomeAndExpanse: number[]
}

export default function Statistic(props: StatisticProps) {

    const transactionstypeCategory = ["Einkommen", "Ausgaben"]
    const {allTransactions} = useContext(TransactionContext);

    return (
        <div className="statistic">
            <header>
                <h1>Ein- und Ausgabebericht</h1>
            </header>

            <section className="statistic-section">
                <div className="statistic-incomeExpanse">
                    <ShowIncomeExpanse
                        sumOfIncome={props.sumOfIncome}
                        sumOfExpanse={props.sumOfExpanse}
                    />
                </div>

                <div className="statistic-charts">
                    <div>
                        {props.amounts.length !== 0 ? (
                                <>
                                    <p>Ausgaben nach Kategorien</p>

                                    <PieChart
                                        allTransactions={allTransactions}
                                        transactionsType={props.groupedCategory}
                                        amounts={props.amounts}
                                    />
                                </>
                            )
                            : <p>Keine Transaktionen vorhanden</p>
                        }
                    </div>
                    <div>
                        {props.amounts.length !== 0 ? (
                                <>
                                    <p>Einkommen und Ausgaben</p>
                                    <PieChart
                                        allTransactions={allTransactions}
                                        transactionsType={transactionstypeCategory}
                                        amounts={props.sumOfIncomeAndExpanse}
                                    />
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
