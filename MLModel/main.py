import pandas as pd

# تحميل البيانات
data = pd.read_csv("creditcard.csv")

# عرض أول 5 صفوف
print(data.head())