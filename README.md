# Credit Card Fraud Detection

A full-stack Credit Card Fraud Detection application that combines a Machine Learning model with a simple web interface.

The project predicts whether a credit card transaction is fraudulent using a trained Random Forest model. It consists of a Flask backend that serves the ML model and a Next.js frontend that allows users to enter transaction data and receive predictions.

---

# Features

* Credit card fraud prediction
* Random Forest machine learning model
* Flask REST API
* Next.js frontend
* Probability score for each prediction
* Automatic feature scaling using StandardScaler
* Simple and lightweight user interface
* Local inference without external services

---

# Project Structure

```text
Credit-Card-Fraud-Detection/
│
├── Backend/
│   ├── app.py
│   ├── model.py
│   ├── fraud_model.pkl
│   ├── scaler.pkl
│   ├── requirements.txt
│   └── ...
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── ...
│
├── implementation_plan.md
├── README.md
└── ...
```

---

# Machine Learning Model

Algorithm:

* Random Forest Classifier

Preprocessing:

* StandardScaler

Evaluation Metrics:

* Classification Report
* Confusion Matrix
* ROC-AUC Score

The trained model and scaler are saved as:

* `fraud_model.pkl`
* `scaler.pkl`

---

# Backend

Framework:

* Flask

Responsibilities:

* Load the trained model
* Load the scaler
* Receive transaction data
* Scale features
* Predict fraud
* Return prediction as JSON

Example response:

```json
{
  "prediction": 0,
  "fraud_probability": 0.0182
}
```

---

# Frontend

Framework:

* Next.js
* React
* TypeScript

Responsibilities:

* Display transaction form
* Send request to Flask API
* Show prediction
* Show fraud probability

The interface intentionally remains simple to focus on functionality.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/cscience670-art/Credit-Card-Fraud-Detection-Dataset.git
cd Credit-Card-Fraud-Detection-Dataset
```

---

# Backend Setup

```bash
cd Backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Run the backend:

```bash
python app.py
```

Default server:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd Frontend

npm install
```

Run development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# API

## POST

```
/predict
```

Example Request

```json
{
    "Time": 0,
    "V1": 0,
    "V2": 0,
    "...": "...",
    "Amount": 100
}
```

Example Response

```json
{
    "prediction": 0,
    "fraud_probability": 0.021
}
```

---

# Packages Used

## Backend

* Flask
* pandas
* scikit-learn
* numpy
* pickle

## Frontend

* Next.js
* React
* TypeScript
* lucide-react
* recharts

---

# Bugs Fixed

The following issues were identified and resolved during implementation:

* Missing `lucide-react` dependency.
* Missing `recharts` dependency.
* Missing UI component stubs (`card`, `button`).
* Missing navigation components (`Topbar`, `Sidebar`).
* TypeScript type errors in `layout.tsx`.
* Missing `React.ReactNode` typing.
* Next.js prerendering error on the login page.
* Broken imports causing build failures.
* Client component rendering issues.
* Various missing files required by the existing project structure.

---

# Verification

The project was successfully verified by:

* Installing all dependencies.
* Building the Next.js application successfully.
* Running the Flask backend.
* Running the Next.js frontend.
* Testing API communication.
* Loading the ML model.
* Returning successful fraud predictions.

---

# Files Added

Examples include:

* `components/ui/card.tsx`
* `components/ui/button.tsx`
* `components/navigation/Topbar.tsx`
* `components/navigation/Sidebar.tsx`

Additional helper files were added where necessary to satisfy missing imports.

---

# Files Modified

Examples include:

* `app/layout.tsx`
* Login page
* Configuration files
* Dependency files

Only the minimum required modifications were made to restore functionality.

---

# How to Test

1. Start the Flask backend.
2. Start the Next.js frontend.
3. Open the web interface.
4. Enter transaction information.
5. Click **Predict**.
6. View the prediction and fraud probability.

---

# Future Improvements

* Better UI/UX
* Authentication
* User history
* Prediction logging
* Docker support
* Unit tests
* Model retraining pipeline
* Charts and analytics dashboard
* Deployment to cloud platforms

---

# Development Notes

The objective of this implementation was simplicity.

The project was intentionally kept lightweight without introducing unnecessary architecture or complexity. Existing code was reused whenever possible, and only the minimum changes required to achieve a fully working application were made.

---

# Author

Developed and maintained by **Sadek Amine**.


