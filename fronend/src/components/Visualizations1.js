import React, { useEffect } from 'react';
import { Pie, Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement } from 'chart.js';
import data from './data.json';
import scatterdata from './scatterdata.json';
import { Card, CardContent, Typography, Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement);

const Visualizations1 = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);

    const categoryData = data.categoryCounts;

    const pieChartData = {
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderWidth: 1
        }]
    };

    const commonOptions = {
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
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <Card style={{ paddingTop: '50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                            Product Category Distribution
                        </Typography>
                        <div style={{ width: '500px', height: '500px' }}>
                            <Pie data={pieChartData} options={commonOptions} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
    )
    
};

export default Visualizations1;
