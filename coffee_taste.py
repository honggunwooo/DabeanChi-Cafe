import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import r2_score, mean_squared_error
from joblib import dump
import os

# 1) CSV 로드
df = pd.read_csv("merged_data_cleaned.csv")

# 2) null 처리: 주요 feature + target 결측 제거
df = df.dropna(subset=['Country.of.Origin', 'Processing.Method', 'Altitude', 'Variety',
                       'Acidity', 'Sweetness', 'Body'])

# 3) Processing.Method 전처리 (3 class)
def process_method_class(val):
    val = str(val).lower()
    if 'washed' in val or 'Washed' in val:
        return 'washed'
    elif 'natural' in val or 'Natural' in val:
        return 'natural'
    else:
        return 'other'

df['Processing.Method'] = df['Processing.Method'].apply(process_method_class)

# 4) Altitude 전처리: "1950-2200" → 1950, "1600 - 1800 m" → 1600
def extract_altitude(val):
    nums = re.findall(r'\d+', str(val))
    if len(nums) > 0:
        return float(nums[0])
    else:
        return np.nan

df['Altitude'] = df['Altitude'].apply(extract_altitude)
df = df.dropna(subset=['Altitude'])

# 5) Variety 전처리
def process_variety(val):
    val = str(val).lower()
    if 'typica' in val or 'Typica' in val:
        return 'Typica'
    elif 'bourdon' in val or 'ctura' in val or 'Bourdon' in val or 'Ctrua' in val:
        return 'Bourbon'
    elif 'geisha' in val or 'Geisha' in val or 'Gesha' in val:
        return 'Geisha'
    elif 'pacamara' in val or 'Pacamara' in val:
        return 'Pacamara'
    elif 'catuai' in val or 'Catuai' in val:
        return 'Catuai'
    else:
        return np.nan

df['Variety'] = df['Variety'].apply(process_variety)
df = df.dropna(subset=['Variety'])

# 6) feature / target
features = ['Country.of.Origin', 'Processing.Method', 'Altitude', 'Variety']
targets = ['Acidity', 'Sweetness', 'Body']

X = df[features]
y = df[targets]

# 7) OneHotEncoder 설정
categorical_features = ['Country.of.Origin', 'Processing.Method', 'Variety']
preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)],
    remainder='passthrough'  # Altitude는 그대로
)

# 8) train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 9) 모델 파이프라인
model = Pipeline(steps=[
    ('preprocess', preprocessor),
    ('regressor', MultiOutputRegressor(
        XGBRegressor(
            n_estimators=300,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            objective='reg:squarederror',
            random_state=42
        )
    ))
])

# 10) 학습
model.fit(X_train, y_train)

# 11) 예측 및 평가
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred, multioutput='uniform_average')
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print("===== MULTI-TARGET MODEL PERFORMANCE =====")
print(f"R2 Score  : {r2:.4f}")
print(f"RMSE      : {rmse:.4f}")

# 12) 모델 저장
save_path = "taste"
os.makedirs(save_path, exist_ok=True)
dump(model, f"{save_path}/xgb_coffee_multitarget_model.joblib")
print(f"\n✅ 모델 저장 완료: {save_path}/xgb_coffee_multitarget_model.joblib")
