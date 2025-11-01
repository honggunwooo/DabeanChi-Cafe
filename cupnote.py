import pandas as pd
import numpy as np
import matplotlib as plt
import seaborn as sns
import warnings
from sklearn.preprocessing import LabelEncoder
import warnings
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import time
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (accuracy_score, classification_report,
                             confusion_matrix, f1_score, precision_score, recall_score)
import xgboost as xgb
from xgboost import XGBClassifier
import kagglehub
import joblib
import os

os.environ['CUDA_VISIBLE_DEVICES'] = '0'

warnings.filterwarnings('ignore')


pd.set_option('display.max_columns', None)
pd.set_option('mode.chained_assignment', None)

df = pd.read_csv('coffee_df_with_type_and_region.csv')

coffee = df[['name', 'region_south_america', 'region_asia_pacific', 'region_hawaii', 'region_central_america', 'region_caribbean', 'region_africa_arabia', 'type_espresso', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'agtron', 'desc_1']]

def classify_desc(text: str) -> str:
    t = text.lower()

    if any(k in t for k in ['berry','cherry','raspberry','blackberry','strawberry']):
        return 'berry'
    if any(k in t for k in ['chocolate','cocoa','mocha','syrupy','sweet','fudge','fudgy']):
        return 'chocolate'
    if any(k in t for k in ['floral','blossom','aroma','jasmine','rose','lavender']):
        return 'floral'
    if any(k in t for k in ['fruit','citrus','lemon','lime','orange','apple','peach','mango']):
        return 'fruit'
    
    return np.nan

coffee['desc_1'] = coffee['desc_1'].apply(classify_desc)
coffee = coffee.dropna(subset=['desc_1'])

cf_south_america = coffee[(coffee['region_south_america'] == 1) & (coffee['type_espresso'] == 0)][['name', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'desc_1']]
cf_south_america.loc[:, 'location'] = 'south_america'

cf_asia = coffee[(coffee['region_asia_pacific'] == 1) & (coffee['type_espresso'] == 0)][['name', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'desc_1']]
cf_asia.loc[:, 'location'] = 'asia'

cf_cent_america = coffee[(coffee['region_central_america'] == 1) & (coffee['type_espresso'] == 0)][['name', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'desc_1']]
cf_cent_america.loc[:,'location'] = 'cent_america'

cf_caribbean = coffee[(coffee['region_caribbean'] == 1) & (coffee['type_espresso'] == 0)][['name', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'desc_1']]
cf_caribbean.loc[:,'location'] = 'caribbean'

cf_africa = coffee[(coffee['region_africa_arabia'] == 1) & (coffee['type_espresso'] == 0)][['name', 'roast', 'origin', 'location', 'flavor', 'body', 'acid', 'aroma', 'desc_1']]
cf_africa.loc[:,'location'] = 'africa'

coffee_flavor = pd.concat([cf_africa, cf_asia, cf_caribbean, cf_cent_america, cf_south_america])

coffee_flavor = coffee_flavor.fillna({'roast':'Medium', 'acid':5.0, 'aroma':5.0, 'flavor':5.0, 'body':5.0})
coffee_flavor = coffee_flavor.drop(coffee_flavor[coffee_flavor['desc_1'] == 'Nan'].index)

X = coffee_flavor.drop(['desc_1', 'flavor', 'body', 'acid', 'aroma', 'name'], axis=1)
y = coffee_flavor['desc_1']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)

le = LabelEncoder()

y_train_encoded = le.fit_transform(y_train)
y_test_encoded = le.transform(y_test)

print(f"원본 y_train 라벨: {np.unique(y_train)}")
print(f"인코딩된 y_train 라벨: {np.unique(y_train_encoded)}")
print(f"원본 y_test 라벨: {np.unique(y_test)}")
print(f"인코딩된 y_test 라벨: {np.unique(y_test_encoded)}")

drive_path = 'cupnote'

if not os.path.exists(drive_path):
    os.makedirs(drive_path)

X = coffee_flavor.drop(['desc_1', 'flavor', 'body', 'acid', 'aroma', 'name'], axis=1)
y = coffee_flavor['desc_1']

# 학습/테스트 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)

print(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
print(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")
print(f"X_train data types:\n{X_train.dtypes}")


# --- 2. 레이블 인코딩 (타겟 y가 문자열이므로 필수) ---
le = LabelEncoder()
y_train_encoded = le.fit_transform(y_train)
y_test_encoded = le.transform(y_test)
print(f"\ny 레이블 인코딩 완료. 클래스 매핑: {dict(zip(le.classes_, le.transform(le.classes_)))}")


# --- 3. 특징 데이터(X) 전처리 (object 타입 컬럼을 category 타입으로 변환) ---
# 오류 해결을 위해 문자열 컬럼을 XGBoost가 처리할 수 있는 category 타입으로 변환
categorical_cols = X_train.select_dtypes(include=['object']).columns
for col in categorical_cols:
    X_train[col] = X_train[col].astype('category')
    # 테스트셋도 동일하게 변환하며, 새로운 범주는 NaN으로 처리
    X_test[col] = X_test[col].astype('category').cat.set_categories(
        X_train[col].cat.categories
    ).fillna(np.nan)
print("\nX 데이터 전처리 완료 (object -> category 변환).")

# --- 4. 모델 설정 및 CPU 학습 (에포크 100회) ---
model = XGBClassifier(
    tree_method='hist',
    device='cuda',
    objective='multi:softprob',
    n_estimators=800,
    learning_rate=0.05,
    max_depth=5,
    subsample=0.9,
    colsample_bytree=0.9,
    reg_lambda=1.0,
    reg_alpha=0.0,
    eval_metric='mlogloss',
    enable_categorical=True
)

eval_set = [(X_train, y_train_encoded), (X_test, y_test_encoded)]
print("\n모델 학습 시작")
class_weights = {
    'jasmine':1.0,
    'floral':0.46,
    'berry':0.36,
    'chocolate':0.20
}

weights = y_train.apply(lambda c: class_weights[c])

model.fit(
    X_train,
    y_train_encoded,
    sample_weight=weights.values,
    eval_set=eval_set,
    verbose=50
)
print("모델 학습 완료.")


# --- 5. 모델 및 인코더 저장 ---
model_save_path = os.path.join(drive_path, 'xgb_coffee_model.joblib')
encoder_save_path = os.path.join(drive_path, 'label_encoder_coffee.joblib')
joblib.dump(model, model_save_path)
joblib.dump(le, encoder_save_path)
print(f"\n모델과 인코더가 구글 드라이브에 저장되었습니다.")


# --- 6. 예측 및 평가 ---
from sklearn.metrics import accuracy_score, classification_report
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test_encoded, y_pred)
print(f"\n정확도: {accuracy:.4f}")
print("분류 보고서:")
print(classification_report(y_test_encoded, y_pred))
print(y.value_counts())