import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Button, TextField, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, 
  Paper, TablePagination, TableFooter, Container, Card, CardContent
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '90%',
      margin: 'auto', 
      marginTop: '6%',
      marginBottom: '5%',
      padding: '0 5%',
      borderRadius: '15px',
      overflow: 'hidden',
  },
  card: {
    backgroundColor: '#E9F1FF',
    borderRadius: '15px',
    boxShadow: '0 3px 5px 2px 1px rgba(0, 0, 0, .3)',
    overflow: 'hidden',
    padding: '20px'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#85B7FF',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    whiteSpace: 'nowrap',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    '&:nth-of-type(odd)': {
      backgroundColor: '#EBF3FF',
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  pagination: {
    overflow: 'hidden',
  },
  button: {
    margin: '10px 0',
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  }
});

function UploadData() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);
    const classes = useStyles();
    const [file, setFile] = useState();
    const [dataWithPredictions, setDataWithPredictions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const encodeData = (data) => {
        return data.map(row => ({
            ...row,
            Item_Fat_Content: row.Item_Fat_Content === 'Low Fat' ? 0 : 1,
            Item_Type: encodeItemType(row.Item_Type),
            Outlet_Size: encodeOutletSize(row.Outlet_Size),
            Outlet_Location_Type: row.Outlet_Location_Type === 'Tier 1' ? 0: row.Outlet_Location_Type === 'Tier 2'? 1: 2, 
            Outlet_Type: encodeOutletType(row.Outlet_Type)
        }));
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataWithPredictions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Predictions");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        saveAs(data, 'predictions.xlsx');
    };

    const encodeItemType = (value) => {
        const itemTypeMapping = {
            'Dairy': 4,
            'Soft Drinks': 14,
            'Meat': 10,
            'Fruits and Vegetables': 6,
            'Household': 9,
            'Baking Goods': 0,
            'Snack Foods': 13,
            'Frozen Foods': 5,
            'Breakfast': 2,
            'Health and Hygiene': 8,
            'Hard Drinks': 7,
            'Canned': 3,
            'Breads': 1,
            'Starchy Foods': 15,
            'Others': 11,
            'Seafood': 12
        };
        console.log(itemTypeMapping[value])
        return itemTypeMapping[value] || null;
    };

    const encodeOutletSize = (value) => {
        const outletSizeMapping = {
            'Medium': 1,
            'Small': 0,
            'High': 2
        };
        return outletSizeMapping[value] || null;
    };

    const encodeOutletLocationType = (value) => {
        const outletLocationMapping = {
            'Tier 1': 0,
            'Tier 2': 1,
            'Tier 3': 2
        };
        console.log(outletLocationMapping[value])
        return outletLocationMapping[value] || null;
    };

    const encodeOutletType = (value) => {
        const outletTypeMapping = {
            'Grocery Store': 0,
            'Supermarket Type1': 1,
            'Supermarket Type2': 2,
            'Supermarket Type3': 3
        };
        console.log(outletTypeMapping[value])
        return outletTypeMapping[value] || null;
    };

    const decodeData = (data) => {
        return data.map(item => ({
            ...item,
            Item_Fat_Content: item.Item_Fat_Content === 0 ? 'Low Fat' : 'Regular',
            Item_Type: decodeItemType(item.Item_Type),
            Outlet_Size: decodeOutletSize(item.Outlet_Size),
            Outlet_Location_Type: decodeOutletLocationType(item.Outlet_Location_Type),
            Outlet_Type: decodeOutletType(item.Outlet_Type)
        }));
    };

    const decodeItemType = (value) => {
        const itemTypeMapping = {
            4: 'Dairy',
            14: 'Soft Drinks',
            10: 'Meat',
            6: 'Fruits and Vegetables',
            9: 'Household',
            0: 'Baking Goods',
            13: 'Snack Foods',
            5: 'Frozen Foods',
            2: 'Breakfast',
            8: 'Health and Hygiene',
            7: 'Hard Drinks',
            3: 'Canned',
            1: 'Breads',
            15: 'Starchy Foods',
            11: 'Others',
            12: 'Seafood'
        };
        return itemTypeMapping[value] || value;
    };

    const decodeOutletSize = (value) => {
        const outletSizeMapping = {
            1: 'Medium',
            0: 'Small',
            2: 'High'
        };
        return outletSizeMapping[value] || value;
    };

    const decodeOutletLocationType = (value) => {
        const outletLocationMapping = {
            0: 'Tier 1',
            1: 'Tier 2',
            2: 'Tier 3'
        };
        return outletLocationMapping[value] || value;
    };

    const decodeOutletType = (value) => {
        const outletTypeMapping = {
            0: 'Grocery Store',
            1: 'Supermarket Type1',
            2: 'Supermarket Type2',
            3: 'Supermarket Type3'
        };
        return outletTypeMapping[value] || value;
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
                const encodedData = encodeData(json);
                try {
                    const response = await axios.post('http://localhost:5000/predict_bulk', encodedData);
                    const combinedData = decodeData(encodedData.map((item, index) => ({
                        ...item,
                        Predicted_Outlet_Sales: Math.round(response.data.predictions[index])
                    })));
                    setDataWithPredictions(combinedData);
                } catch (error) {
                    console.error('Error during bulk prediction:', error);
                    setDataWithPredictions([]);
                }
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
                                    <Button onClick={downloadExcel} variant="contained" color="secondary" style={{ margin: '20px' }}>
                        Export
                    </Button>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default UploadData;
