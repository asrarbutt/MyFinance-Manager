import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
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
        <Card sx={{width: 900, height: '20', minWidth: 245, ml: 5, mr: 5, borderRadius: '15px'}}>
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                <Typography sx={{fontSize: 14}} color="text.secondary">
                    {props.allTransaction.description}
                </Typography>

                <Typography sx={{fontSize: 14}} color="text.secondary">
                    {props.allTransaction.amount}
                </Typography>

                <Typography sx={{fontSize: 14}} color="text.secondary">
                    {props.allTransaction.category}
                </Typography>

                <Typography sx={{fontSize: 14}} color="text.secondary">
                    {dateFromInstant(props.allTransaction.transactionDate, "de-DE")}
                </Typography>

                <Box>
                    <IconButton>
                        <StlyeDeleteIcon onClick={() => props.deleteTransaction(props.allTransaction.id)}/>
                    </IconButton>
                    <IconButton>
                        <UpdateTransaction allTransaction={props.allTransaction}/>
                    </IconButton>
                </Box>
            </CardContent>

        </Card>
    );
}
