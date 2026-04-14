# =========================================
# 💸 Fraud Detection ML Model
# =========================================

import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

from imblearn.over_sampling import SMOTE


# =========================================
# 📦 1. Load Dataset
# =========================================

print("📥 Loading dataset...")
data = pd.read_csv("creditcard.csv")

print("✅ Dataset loaded successfully!")
print(data.head())


# =========================================
# 🔍 2. Explore Data
# =========================================

print("\n📊 Data Info:")
print(data.info())

print("\n📊 Class Distribution:")
print(data['Class'].value_counts())


# =========================================
# ⚙️ 3. Prepare Data
# =========================================

X = data.drop("Class", axis=1)
y = data["Class"]

print("\n⚖️ Handling Imbalanced Data using SMOTE...")
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

print("✅ Data balanced!")
print(pd.Series(y_resampled).value_counts())


# =========================================
# ✂️ 4. Train/Test Split
# =========================================

X_train, X_test, y_train, y_test = train_test_split(
    X_resampled, y_resampled, test_size=0.2, random_state=42
)


# =========================================
# 🤖 5. Train Model
# =========================================

print("\n🤖 Training model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("✅ Model trained!")


# =========================================
# 🧪 6. Evaluate Model
# =========================================

print("\n🧪 Evaluating model...")
y_pred = model.predict(X_test)

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

print("\n📊 Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# =========================================
# 💾 7. Save Model
# =========================================

print("\n💾 Saving model...")
pickle.dump(model, open("fraud_model.pkl", "wb"))

print("✅ Model saved as fraud_model.pkl")


# =========================================
# 🔍 8. Test Prediction
# =========================================

print("\n🔍 Testing prediction...")

sample = X_test.iloc[0].values.reshape(1, -1)

prediction = model.predict(sample)
probability = model.predict_proba(sample)

print("\n🧾 Result:")
print("Prediction:", "🚨 FRAUD" if prediction[0] == 1 else "✅ NORMAL")
print("Fraud Probability:", probability[0][1])


# =========================================
# 🎉 DONE
# =========================================

print("\n🎉 Model is ready to use!")