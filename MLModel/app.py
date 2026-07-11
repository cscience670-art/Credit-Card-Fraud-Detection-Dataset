import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

# 1. بناء الهيكل المدخل
class Transaction(BaseModel):
    features: List[float] = Field(..., min_items=30, max_items=30)

app = FastAPI(title="💸 Fraud Detection API")

# تحميل الملفات المحفوظة
try:
    with open("fraud_model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    print("✅ تم تحميل النموذج والمحول بنجاح!")
except FileNotFoundError:
    model, scaler = None, None
    print("⚠️ تنبيه: لم يتم العثور على الملفات المحفوظة بعد. قم بتشغيل قطاع التدريب أولاً.")

@app.post("/predict", summary="فحص معاملة مالية")
def predict_transaction(transaction: Transaction):
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="النموذج غير جاهز للعمل بعد أو لم يتم تدريبه.")
    
    try:
        # تجهيز البيانات وتحويلها
        raw_features = np.array(transaction.features).reshape(1, -1)
        scaled_features = scaler.transform(raw_features)
        
        # التنبؤ
        prediction = int(model.predict(scaled_features)[0])
        probability = float(model.predict_proba(scaled_features)[0][1])
        
        return {
            "is_fraud": bool(prediction == 1),
            "fraud_probability": round(probability, 4),
            "status": "🚨 FRAUD DETECTED" if prediction == 1 else "✅ NORMAL"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"حدث خطأ أثناء المعالجة: {str(e)}")
