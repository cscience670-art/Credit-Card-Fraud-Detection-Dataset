import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load model and scaler once at startup
try:
    with open("fraud_model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    print("✅ Model and Scaler loaded successfully!")
except FileNotFoundError:
    model, scaler = None, None
    print("⚠️ Error: Saved model or scaler file not found.")

@app.route("/predict", methods=["POST"])
def predict():
    if model is None or scaler is None:
        return jsonify({"error": "Model or scaler not loaded. Train the model first."}), 503

    try:
        data = request.get_json()
        if not data or "features" not in data:
            return jsonify({"error": "Missing 'features' in request body."}), 400

        features = data["features"]
        
        # Verify feature length
        if len(features) != 30:
            return jsonify({"error": f"Expected 30 features, got {len(features)}"}), 400

        # Convert to numpy array and reshape
        raw_features = np.array(features).reshape(1, -1)
        
        # Scale features
        scaled_features = scaler.transform(raw_features)
        
        # Predict
        prediction = int(model.predict(scaled_features)[0])
        probability = float(model.predict_proba(scaled_features)[0][1])

        return jsonify({
            "prediction": prediction,
            "fraud_probability": round(probability, 4)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
