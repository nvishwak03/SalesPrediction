import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import data from './data.json';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Visualizations = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);

    const categoryData = data.categoryCounts;
    const chartData = {
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        maintainAspectRatio: false
    };

    return (
        <Card style={{paddingTop:'50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
            <CardContent>
                <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                    Product Category Distribution
                </Typography>
                <div style={{ width: '600px', height: '400px' }}>
                    <Pie data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Visualizations;
