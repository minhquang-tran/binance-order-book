import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DepthChart = ({ bids, asks }) => {
    const bidData = bids.map(([price, quantity]) => ({ x: price, y: quantity }));
    const askData = asks.map(([price, quantity]) => ({ x: price, y: quantity }));

    const data = {
        datasets: [
            {
                label: 'Bids',
                data: bidData,
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Asks',
                data: askData,
                borderColor: 'red',
                fill: false,
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Price'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantity'
                },
                beginAtZero: true
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default DepthChart;
