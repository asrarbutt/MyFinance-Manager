import * as React from 'react';

import "./MyCard.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import {styled} from "@mui/system";
import {dateFromInstant} from "../util/Util";
import TransactionDto from "../model/TransactionDto";
import UpdateTransaction from "./UpdateTransaction";


const StlyeDeleteIcon = styled(DeleteForeverIcon)`

  font-size: 2rem;
 `;

const StlyeEditIcon = styled(EditIcon)`

  font-size: 2rem;
 `;

type MyCardProps = {

    allTransaction: TransactionDto;
    deleteTransaction: (id: string) => void;

}

export default function MyCard(props: MyCardProps) {

    return (
        <div style={{display: "flex", justifyContent: "center", alignContent: "center", maxWidth: "50rem"}}>
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
                        <StlyeDeleteIcon onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                    </IconButton>
                    <IconButton>
                        <UpdateTransaction allTransactions={props.allTransaction}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
