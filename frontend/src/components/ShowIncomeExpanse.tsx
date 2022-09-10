import {convertAmountToGermanCurrencyStyle} from "../util/Util";

export default function ShowIncomeExpanse(props: { sumOfIncome: number, sumOfExpanse: number }) {

    return (
        <div>
            <div className="statistic-incomeExpanse">
                <div className="statistic-showIncome">
                    <p>Einkommen</p>
                    <p>{convertAmountToGermanCurrencyStyle(props.sumOfIncome)}</p>
                </div>
                <div className="statistic-showExpanse">
                    <p>Ausgaben</p>
                    <p>{convertAmountToGermanCurrencyStyle(props.sumOfExpanse)}</p>
                </div>
            </div>
        </div>
    )
}