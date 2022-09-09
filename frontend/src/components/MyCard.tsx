import * as React from 'react';

import "./MyCard.css";
import {dateFromInstant} from "../util/Util";
import TransactionDto from "../model/TransactionDto";
import UpdateTransaction from "./UpdateTransaction";
import {DeleteIconStyled} from './ui/Button.styled';

type MyCardProps = {
    allTransaction: TransactionDto;
    deleteTransaction: (id: string) => void;
}

export default function MyCard(props: MyCardProps) {

    return (
        <div className={`card ${props.allTransaction.isIncome ? "card-isIncome" : "card-expanse"}`}>

            <div className="card-description">
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

            <div className="card-amount">{props.allTransaction.amount} €</div>

        </div>
    );
}
