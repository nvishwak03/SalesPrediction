import React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './styles.css';
import Visualizations1 from './Visualizations1';

class Home extends React.Component {
  componentDidMount() {
    // document.body.style.backgroundColor = "#1e293b";
    document.body.style.backgroundColor = "white";
  }

  state = {
    Item_Weight: '',
    Item_Fat_Content: '',
    Item_Visibility: '',
    Item_Type: '',
    Item_MRP: '',
    Outlet_Size: '',
    Outlet_Location_Type: '',
    Outlet_Type: '',
    predictionResult: null
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', this.state);
      this.setState({ predictionResult: response.data.predictions });
    } catch (error) {
      console.error('Error during prediction:', error);
      this.setState({ predictionResult: "Error in making prediction." });
    }
  };
  renderSuggestions = () => {
    if (!this.state.predictionResult) return null;
    return (
      <Card className='card-form' style={{backgroundColor: '#FFE9E2',  borderRadius: '15px',boxShadow: '0 3px 5px 2px 1px rgba(0, 0, 0, .3)', overflow: 'hidden',padding: '20px'}}>
            <CardContent>
            <div>
        <h2>Item Sales Prediction: {Math.round(this.state.predictionResult)}</h2>
        <h3>Suggestions:</h3>
        <ul>
          <li>Enhance product visibility by strategically placing high-demand items in prominent areas within the store, based on their visibility percentages and sales performance</li>
          <li>Adjust the Maximum Retail Price Item MRP of products to align with market demand and competitor pricing, especially for high visibility and high sales items</li>
          <li>Implement targeted marketing campaigns based on item type and sales data to promote products that are likely to perform well, considering seasonal and regional trends.</li>
          <li>Allocate additional resources to high-performing stores and consider expansion or renovation to capitalize on their market position</li>
          <li>Regularly analyze the sales data Item_Outlet_Sales to identify trends and anomalies that can inform strategic decisions, such as promotions, discounts, or even discontinuing underperforming products</li>
        </ul>
      </div>
        <Visualizations1/>
            </CardContent>
      </Card>
    );
  }

  handleFatContent = (event) => {
    const selectedValue = event.target.value;
    this.setState({ Item_Fat_Content: selectedValue });
  }
  
  handleItemType = (event) => {
    const selectedValue = event.target.value;
    this.setState({ Item_Type: selectedValue });
  }

  handleOutletSize = (event) => {
    const selectedValue = event.target.value;
    this.setState({ Outlet_Size: selectedValue });
  }

  handleOutletLocationType = (event) => {
    const selectedValue = event.target.value;
    this.setState({ Outlet_Location_Type: selectedValue });
  }

  handleOutletType = (event) => {
    const selectedValue = event.target.value;
    this.setState({ Outlet_Type: selectedValue });
  }

  render() {
    const fatContentOptions ={
      'Low Fat': 0,
      'Regular': 1
    }
    const itemTypeOptions = {
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
    const outletSizeOptions = {
      'Medium': 1,
      'Small': 0,
      'High': 2
    };
    const outletLocationTypeOptions = {
      'Tier 1': 0,
      'Tier 2': 1,
      'Tier 3': 2
    };
    const outletTypeOptions = {
      'Grocery Store': 0,
      'Supermarket Type1': 1,
      'Supermarket Type2': 2,
      'Supermarket Type3': 3
    };

    return (
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '100px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className='card-form' style={{backgroundColor: '#E9F1FF',  borderRadius: '15px',boxShadow: '0 3px 5px 2px 1px rgba(0, 0, 0, .3)', overflow: 'hidden',padding: '20px'}}>
            <CardContent>
              <form onSubmit={this.handleSubmit}>
                <h2>Enter Item Details</h2>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Item Weight"
                      name="Item_Weight"
                      value={this.state.Item_Weight}
                      onChange={this.handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Fat Content</InputLabel>
                      <Select
                        value={this.state.Item_Fat_Content}
                        onChange={this.handleFatContent}
                        required
                      >
                        <MenuItem value="">Select Fat Content</MenuItem>
                        {Object.keys(fatContentOptions).map(label => (
                          <MenuItem key={label} value={fatContentOptions[label]}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Item Visibility"
                      name="Item_Visibility"
                      value={this.state.Item_Visibility}
                      onChange={this.handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Item Type</InputLabel>
                      <Select
                        value={this.state.Item_Type}
                        onChange={this.handleItemType}
                        required
                      >
                        <MenuItem value="">Select Item Type</MenuItem>
                        {Object.keys(itemTypeOptions).map(label => (
                          <MenuItem key={label} value={itemTypeOptions[label]}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Item MRP"
                      name="Item_MRP"
                      value={this.state.Item_MRP}
                      onChange={this.handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Outlet Size</InputLabel>
                      <Select
                        value={this.state.Outlet_Size}
                        onChange={this.handleOutletSize}
                        required
                      >
                        <MenuItem value="">Select Outlet Size</MenuItem>
                        {/* Assuming outletSizeOptions is defined */}
                        {Object.keys(outletSizeOptions).map(label => (
                          <MenuItem key={label} value={outletSizeOptions[label]}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Outlet Location Type</InputLabel>
                      <Select
                        value={this.state.Outlet_Location_Type}
                        onChange={this.handleOutletLocationType}
                        required
                      >
                        <MenuItem value="">Select Location Type</MenuItem>
                        {/* Assuming outletLocationTypeOptions is defined */}
                        {Object.keys(outletLocationTypeOptions).map(label => (
                          <MenuItem key={label} value={outletLocationTypeOptions[label]}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Outlet Type</InputLabel>
                      <Select
                        value={this.state.Outlet_Type}
                        onChange={this.handleOutletType}
                        required
                      >
                        <MenuItem value="">Select Outlet Type</MenuItem>
                        {Object.keys(outletTypeOptions).map(label => (
                          <MenuItem key={label} value={outletTypeOptions[label]}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          {this.renderSuggestions()}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
