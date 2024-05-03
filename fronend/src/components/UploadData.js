import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Button, TextField, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, 
  Paper, TablePagination, TableFooter, Container, Card, CardContent
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Pie } from 'react-chartjs-2';

const useStyles = makeStyles({
  // Styles as before
});

function UploadData() {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [dataWithPredictions, setDataWithPredictions] = useState([]);
    const [uploadedData, setUploadedData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target.result;
                const workbook = XLSX.read(buffer, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setUploadedData(json);

                // Calculate item type counts from uploadedData
                const itemTypeCounts = {};
                json.forEach(item => {
                    if (item.Item_Type in itemTypeCounts) {
                        itemTypeCounts[item.Item_Type]++;
                    } else {
                        itemTypeCounts[item.Item_Type] = 1;
                    }
                });

                // Prepare data for the pie chart
                const chartData = {
                    labels: Object.keys(itemTypeCounts),
                    datasets: [{
                        data: Object.values(itemTypeCounts),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
                        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#4682B4'],
                        borderWidth: 1
                    }]
                };

                setChartData(chartData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataWithPredictions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Predictions");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        saveAs(data, 'predictions.xlsx');
    };

    return (
        <Container className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <h2>Upload Excel File for Sales Prediction</h2>
                    <form onSubmit={handleFileUpload}>
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            inputProps={{ accept: ".xlsx, .xls" }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">Upload and Predict</Button>
                    </form>
                    {uploadedData.length > 0 && (
                        <Paper>
                            <h2 style={{ textAlign: 'center' }}>Item Type Distribution</h2>
                            <div style={{ width: '600px', height: '400px', margin: 'auto' }}>
                                <Pie data={chartData} />
                            </div>
                        </Paper>
                    )}
                    {dataWithPredictions.length > 0 && (
                        <Paper>
                            <h2 style={{ textAlign: 'center' }}>Sales Prediction</h2>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Object.keys(dataWithPredictions[0]).map((key, index) => (
                                                <TableCell key={index} className={classes.tableHeaderCell}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataWithPredictions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                            <TableRow key={index} className={classes.tableRow}>
                                                {Object.entries(item).map(([key, value], valIndex) => (
                                                    <TableCell key={valIndex} className={classes.tableCell}>
                                                        {value}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 50]}
                                                colSpan={3}
                                                count={dataWithPredictions.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                className={classes.pagination}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                    </Table>
                            </TableContainer>
                            <Button onClick={downloadExcel} variant="contained" color="secondary" style={{ margin: '20px' }}>
                                Export
                            </Button>
                        </Paper>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default UploadData;
