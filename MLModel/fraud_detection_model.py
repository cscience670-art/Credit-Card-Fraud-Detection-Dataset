# =========================================
# 💸 Advanced Fraud Detection ML Model
# =========================================

import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler


# =========================================
# 📦 1. Load Dataset
# =========================================

print("📥 Loading dataset...")
data = pd.read_csv("creditcard.csv")

# ⚡ Optimization: use smaller dataset
data = data.sample(n=50000, random_state=42)

print("✅ Dataset loaded!")
print(data.head())


# =========================================
# 🔍 2. Prepare Data
# =========================================

X = data.drop("Class", axis=1)
y = data["Class"]

# 🔧 Scaling important for ML
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


# =========================================
# ✂️ 3. Train/Test Split
# =========================================

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)


# =========================================
# 🤖 4. Train Model (Optimized)
# =========================================

print("\n🤖 Training model...")

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=12,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1  # use all CPU cores
)

model.fit(X_train, y_train)

print("✅ Model trained!")


# =========================================
# 🧪 5. Evaluate Model
# =========================================

print("\n🧪 Evaluating model...")

y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

print("\n📊 Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\n📈 ROC-AUC Score:")
print(roc_auc_score(y_test, y_prob))


# =========================================
# 💾 6. Save Model + Scaler
# =========================================

print("\n💾 Saving model and scaler...")

pickle.dump(model, open("fraud_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))

print("✅ Saved: fraud_model.pkl & scaler.pkl")


# =========================================
# 🔍 7. Prediction Function (for API)
# =========================================

def predict_transaction(input_data):
    """
    input_data: list of features
    """

    input_scaled = scaler.transform([input_data])

    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]

    return {
        "prediction": int(prediction),
        "fraud_probability": float(probability)
    }


# =========================================
# 🧪 8. Test Prediction
# =========================================

print("\n🔍 Testing prediction...")

sample = X.iloc[0].values
result = predict_transaction(sample)

print("\n🧾 Result:")
print("Prediction:", "🚨 FRAUD" if result["prediction"] == 1 else "✅ NORMAL")
print("Fraud Probability:", result["fraud_probability"])


# =========================================
# 🎉 DONE
# =========================================

print("\n🎉 Advanced Model Ready!")
