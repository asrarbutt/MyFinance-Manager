import * as React from 'react';

import "./MyCard.css";
import {IconButton} from "@mui/material";
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
        <div className={`myCard-container ${props.allTransaction.isIncome ? "myCard-isIncome" : "myCard-expanse"}`}>
            <div className="myCard-content">
                <div>
                    <h1> {props.allTransaction.description}</h1>
                    <h3>{props.allTransaction.category}</h3>
                    <h3>{dateFromInstant(props.allTransaction.transactionDate, "de-DE")}</h3>
                </div>
                <div className="myCard-amount">
                    <h1>{props.allTransaction.amount} €</h1>
                </div>
            </div>
            <div className="myCard-actions">
                <IconButton>
                    <DeleteIconStyled onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                </IconButton>
                <IconButton>
                    <UpdateTransaction allTransactions={props.allTransaction}/>
                </IconButton>
            </div>
        </div>
    );
}
