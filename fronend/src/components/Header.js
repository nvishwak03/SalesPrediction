import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ minHeight: 80 }}>
        <Button color="inherit" component={Link} to="/home" sx={{ fontSize: '1.2rem', padding: '10px 20px' }}>Home</Button>  
        <Button color="inherit" component={Link} to="/uploaddata" sx={{ fontSize: '1.2rem', padding: '10px 20px' }}>Upload Data</Button> 
        <Button color="inherit" component={Link} to="/visualizations" sx={{ fontSize: '1.2rem', padding: '10px 20px' }}>Visualizations</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
