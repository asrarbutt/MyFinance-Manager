import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


export default function MyCard() {
    return (
        <Card sx={{width: '50rem', minWidth: 245, ml: 5, mr: 5}}>
            <CardContent>


                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </CardContent>

        </Card>
    );
}
