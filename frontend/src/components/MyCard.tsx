import * as React from 'react';

import "./MyCard.css";
import {convertAmountToGermanCurrencyStyle, dateFromInstant} from "../util/Util";
import TransactionDto from "../model/TransactionDto";
import UpdateTransaction from "./UpdateTransaction";
import {DeleteIconStyled, EditImageIcon} from './ui/Icons.styled';
import {Button} from '@mui/material';

type MyCardProps = {
    allTransaction: TransactionDto;
    deleteTransaction: (id: string) => void;
}

export default function MyCard(props: MyCardProps) {

    return (
        <div className={`card ${props.allTransaction.isIncome ? "card-isIncome" : "card-expanse"}`}>
            <div className="card-descriptionAmount">
                <p className="card-description">
                    {props.allTransaction.description}
                </p>
                <p className="card-amount">
                    {props.allTransaction.isIncome ?
                        `+ ${(convertAmountToGermanCurrencyStyle(props.allTransaction.amount))}`
                        :
                        `- ${(convertAmountToGermanCurrencyStyle(props.allTransaction.amount))}`}
                </p>
            </div>
            <div className="card-dateCategoryIcons">
                <div className="card-date">
                    <p>
                        {dateFromInstant(props.allTransaction.transactionDate, "de-DE")}
                    </p>
                </div>
                <div className="card-category">
                    <p>{props.allTransaction.category}</p>
                </div>
                <div className="card-icon">
                    {props.allTransaction.pictureId !== ("" || "NO IMAGE" || undefined) ? (
                        <>
                            <Button href={props.allTransaction.pictureId}>
                                <EditImageIcon/>
                            </Button>
                            <UpdateTransaction allTransactions={props.allTransaction}/>
                            <DeleteIconStyled
                                onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                        </>
                    ) : (
                        <>
                            <UpdateTransaction allTransactions={props.allTransaction}/>
                            <DeleteIconStyled
                                onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
