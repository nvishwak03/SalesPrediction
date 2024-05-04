import React, { useEffect } from 'react';
import { Pie, Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement } from 'chart.js';
import data from './data.json';
import scatterdata from './scatterdata.json';
import { Card, CardContent, Typography, Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement);

const Visualizations = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);

    const categoryData = data.categoryCounts;
    const scatterDataMRP = scatterdata.map(item => ({
        x: item.Item_MRP,
        y: item.Item_Outlet_Sales
    }));
    const scatterDataVisibility = scatterdata.map(item => ({
        x: item.Item_Visibility,
        y: item.Item_Outlet_Sales
    }));
    const scatterDataWeight = scatterdata.map(item => ({
        x: item.Item_Weight,
        y: item.Item_Outlet_Sales
    }));

    const barData = data.barData;
    const barChartLabels = Object.keys(barData);
    const barChartValues = Object.values(barData);

    const pieChartData = {
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
            borderWidth: 1
        }]
    };

    const barChartData = {
        labels: barChartLabels,
        datasets: [{
            label: 'Sales',
            data: barChartValues,
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
                '#4682B4', '#32CD32', '#FFA07A', '#20B2AA', '#DA70D6',
                '#FF4500', '#6A5ACD', '#708090', '#FF6347', '#2E8B57'
            ],
            borderColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#4682B4', '#32CD32', '#FFA07A', '#20B2AA', '#DA70D6',
                '#FF4500', '#6A5ACD', '#708090', '#FF6347', '#2E8B57'
            ],
            borderWidth: 1
        }]
    };

    const scatterChartDataMRP = {
        datasets: [{
            label: 'MRP vs Sales',
            data: scatterDataMRP,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1
        }]
    };

    const scatterChartDataVisibility = {
        datasets: [{
            label: 'Visibility vs Sales',
            data: scatterDataVisibility,
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            borderWidth: 1
        }]
    };

    const scatterChartDataWeight = {
        datasets: [{
            label: 'Weight vs Sales',
            data: scatterDataWeight,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
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

    const scatterOptions = {
        ...commonOptions,
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Value'
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Sales'
                }
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
                <Card style={{ paddingTop: '50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                            Outlet Sales vs Outlet Establishment Year
                        </Typography>
                        <div style={{ width: '500px', height: '500px' }}>
                            <Bar data={barChartData} options={commonOptions} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card style={{ paddingTop: '50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                            MRP vs Sales
                        </Typography>
                        <div style={{ width: '500px', height: '500px' }}>
                            <Scatter data={scatterChartDataMRP} options={scatterOptions} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card style={{ paddingTop: '50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                            Visibility vs Sales
                        </Typography>
                        <div style={{ width: '500px', height: '500px' }}>
                            <Scatter data={scatterChartDataVisibility} options={scatterOptions} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card style={{ paddingTop: '50px', background: '#1e293b', color: '#ffffff', margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
                            Visibility vs Sales
                        </Typography>
                        <div style={{ width: '500px', height: '500px' }}>
                            <Scatter data={scatterChartDataWeight} options={scatterOptions} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
    )
    
};

export default Visualizations;
