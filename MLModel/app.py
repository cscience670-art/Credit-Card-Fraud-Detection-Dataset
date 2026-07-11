import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

# 1. تعريف الهيكل المتوقع للبيانات المدخلة (Data Validation)
class TransactionInput(BaseModel):
    # نستخدم قائمة تحتوي على 30 عنصراً (الوقت + 28 ميزة مستخلصة + القيمة)
    features: List[float] = Field(
        ..., 
        description="قائمة بـ 30 عنصر تمثل خصائص المعاملة بالترتيب (Time, V1-V28, Amount)",
        min_items=30,
        max_items=30
    )

# 2. تهيئة تطبيق FastAPI
app = FastAPI(
    title="💸 نظام الكشف المبكر عن الاحتيال المالي",
    description="واجهة برمجية (API) مدعومة بالذكاء الاصطناعي لفحص المعاملات المشبوهة فوراً.",
    version="1.0.0"
)

# 3. تحميل النموذج والمحول عند إقلاع الخادم
try:
    with open("fraud_model.pkl", "rb") as f:
        model = pickle.dump(f) # سيتم قراءتها عبر load
        # تصحيح دالة القراءة:
except FileNotFoundError:
    raise RuntimeError("⚠️ خطأ: ملفات النموذج غير موجودة! يرجى تشغيل train.py أولاً.")
