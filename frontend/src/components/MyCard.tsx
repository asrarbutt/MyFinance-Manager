import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import TransactionData from "../model/TransactionData";


const StlyeDeleteIcon = styled(DeleteForeverIcon)`

  font-size: 2rem;
 `;

const StlyeEditIcon = styled(EditIcon)`

  font-size: 2rem;
 `;

type MyCardProps = {

    allTransaction: TransactionData;
}

export default function MyCard(props: MyCardProps) {

    return (
        <Card sx={{width: 900, height: '20', minWidth: 245, ml: 5, mr: 5, borderRadius: '15px'}}>
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>

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
                    {props.allTransaction.transactionDate}
                </Typography>

                <Box>
                    <IconButton>
                        <StlyeDeleteIcon/>
                    </IconButton>
                    <IconButton>
                        <StlyeEditIcon/>
                    </IconButton>
                </Box>
            </CardContent>

        </Card>
    );
}
