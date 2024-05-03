
# BigMart Sales Prediction

## This project is a server-side application built using Python Flask for machine learning model deployment. It serves Sales predictions using an XGBoost model trained on bigmart sales dataset.

## Installation (Backend)
1. Navigate to the server directory using the command line:
### `cd server`

2. Install Python virtual environment:
### `python3 -m venv venv`

3. Activate the virtual environment:
### `. venv/Scripts/activate  # For Windows`

4. Install required packages from requirements.txt:
### `pip install -r requirements.txt`

Alternatively, you can install the required packages individually:
### `pip install xgboost flask flask_cors numpy pandas scikit-learn`

5. Start your backend server:
### `python server.py`

## Installation (Frontend)
1. Open New Terminal and navigate to the frontend directory using the command line:
### `cd fronend`

2. Install node_modules:
### `npm install`
If it raises any error/exceptions run:
### `npm install --force` 
or
### `npm install --legacy-peer-deps`

3. Start your frontend:
### `npm start`

Note: Download the CORS extension and enable cors to handle apis between Flask backend server and React frontend 

## Demo
1. Open your browser and go to http://localhost:<port_number>/home, replacing <port_number> with the port number on which the React application is running
### `http://localhost:<port_number>/home`

2. Fill the input Item details form and on Submit you can see the predictions value like below:
   ![image](https://github.com/nvishwak03/SalesPrediction/assets/157331939/e2beab13-417f-4269-b487-c6e8704c2a7c)

3. Click on "Upload Data" to upload the Excel file containing the items for which you want to predict sales
4. Once the file is uploaded, the application will process the data and provide predictions which can be exported
   ![image](https://github.com/nvishwak03/SalesPrediction/assets/157331939/36d2419b-46d5-4023-a523-ab53426d52de)
5. Click on "Visualizations" to view the data distribution plots for trained data



