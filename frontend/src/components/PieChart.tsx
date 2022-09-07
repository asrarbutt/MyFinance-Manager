import React from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import TransactionDto from "../model/TransactionDto";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {

    transactionsType: string[],
    allTransactions: TransactionDto[];
    amounts: number[];
}

export default function PieChart(props: PieChartProps) {

    const data = {
        labels: props.transactionsType,
        datasets: [
            {
                label: '# of Votes',
                data: props.amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],

    };
    return (
        <div style={{height: '180px', width: '250px'}}>
            <Pie data={data}/>
        </div>
    );
}
