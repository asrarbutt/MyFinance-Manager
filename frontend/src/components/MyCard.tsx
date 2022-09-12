import * as React from 'react';

import "./MyCard.css";
import {convertAmountToGermanCurrencyStyle, dateFromInstant} from "../util/Util";
import TransactionDto from "../model/TransactionDto";
import UpdateTransaction from "./UpdateTransaction";
import {DeleteIconStyled} from './ui/Icons.styled';

type MyCardProps = {
    allTransaction: TransactionDto;
    deleteTransaction: (id: string) => void;
}

export default function MyCard(props: MyCardProps) {

    return (
        <div className={`card ${props.allTransaction.isIncome ? "card-isIncome" : "card-expanse"}`}>

            <div className="card-descriptionAmount">

                <p className="card-description">{props.allTransaction.description}</p>

                <p className="card-amount">{convertAmountToGermanCurrencyStyle(props.allTransaction.amount)}</p>
            </div>

            <div className="card-dateCategoryIcons">
                <div className="card-date"><p>{dateFromInstant(props.allTransaction.transactionDate, "de-DE")}</p></div>

                <div className="card-category">
                    <p>{props.allTransaction.category}</p>
                </div>
                <div className="card-icon">
                    <UpdateTransaction allTransactions={props.allTransaction}/>
                    <DeleteIconStyled
                        onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                </div>
            </div>

            {/*<div className="card-description">
                <p>{props.allTransaction.description}</p>
            </div>

            <div className="card-dateCategoryIcon">
                <div className="card-date"><p>{dateFromInstant(props.allTransaction.transactionDate, "de-DE")}</p></div>
                <div className="card-category">
                    <p>{props.allTransaction.category}</p>
                </div>

                <div className="card-icon">
                    <span> <UpdateTransaction allTransactions={props.allTransaction}/></span>
                    <span><DeleteIconStyled onClick={() => props.deleteTransaction(props.allTransaction.id)}/></span>
                </div>
            </div>

            <div className="card-amount">{props.allTransaction.amount} €</div>*/}
        </div>
    );
}
