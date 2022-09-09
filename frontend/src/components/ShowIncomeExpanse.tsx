export default function ShowIncomeExpanse(props: { sumOfIncome: number, sumOfExpanse: number }) {

    return (
        <div>
            <div className="statistic-incomeExpanse">
                <div className="statistic-showIncome">
                    <p>Einkommen</p>
                    <p>{props.sumOfIncome} €</p>
                </div>
                <div className="statistic-showExpanse">
                    <p>Ausgaben</p>
                    <p>{props.sumOfExpanse} €</p>
                </div>
            </div>
        </div>
    )
}