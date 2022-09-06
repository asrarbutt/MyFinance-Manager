import React from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import TransactionDto from "../model/TransactionDto";


ChartJS.register(ArcElement, Tooltip, Legend);


type PieChartProps = {
    categoryType: string[],
    incomeType: string,
    allTransactions: TransactionDto[];
}

export default function PieChart(props: PieChartProps) {


    let grouped = Array.from(
        props.allTransactions
            .reduce(
                (m,
                 {category, amount}) =>
                    m.set(category, (m.get(category) || 0) + amount), new Map),
        ([key, val]) => ({key, val})
    );

    const amounts = grouped.filter(t => t.val).map(t => t.val)

    const data = {
        labels: props.categoryType,
        datasets: [
            {
                label: '# of Votes',
                data: amounts,
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


    return (<div style={{height: '400px', width: '600px'}}>
        <Doughnut data={data}/>

    </div>);
}