
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
