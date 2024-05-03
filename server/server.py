from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import sklearn
print(sklearn.__version__)

app = Flask(__name__)
CORS(app)

with open('XGBoostRegr.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        print(data)
        input_data = np.array([], dtype=object)
        for i in data.keys():
            input_data = np.append(input_data, data[i])

        input_data_reshaped = input_data.reshape(1, -1)
        predictions = loaded_model.predict(input_data_reshaped)
        print(predictions)
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)})

@app.route('/predict_bulk', methods=['POST'])
def predict_bulk():
    try:
        data = request.get_json()
        print(data)
        df = pd.DataFrame(data)
        try:
            predictions = loaded_model.predict(df)
            print("Predictions:", predictions)
        except Exception as e:
            print("Prediction failed:", str(e))
            return jsonify({'error': str(e)}), 500
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
