import pandas as pd
import numpy as np
from joblib import load

# --- 1. 모델 로드 ---
MODEL_PATH = "taste/xgb_coffee_multitarget_model.joblib"
model = load(MODEL_PATH)
print("✅ 모델 로드 완료")

# --- 2. 입력값 받기 ---
def predict_cupnote():
    print("\n--- 커피 정보 입력 ---")
    country = input("Country.of.Origin: ").strip()
    method = input("Processing.Method (예: Washed, Natural, Other): ").strip().lower()
    altitude = input("Altitude (예: 1950): ").strip()
    variety = input("Variety (Typica, Bourbon, Geisha, Pacamara, Catuai): ").strip()

    # Method 전처리
    if 'washed' in method or 'Washed' in method:
        method = 'washed'
    elif 'natural' in method or 'Natural' in method:
        method = 'natural'
    else:
        method = 'other'

    # Altitude 숫자만 추출
    try:
        altitude = float(altitude)
    except:
        print("❌ Altitude는 숫자로 입력해야 합니다.")
        return

    # DataFrame 생성
    new_df = pd.DataFrame({
        'Country.of.Origin':[country],
        'Processing.Method':[method],
        'Altitude':[altitude],
        'Variety':[variety]
    })

    # --- 3. 예측 ---
    try:
        y_pred = model.predict(new_df)[0]  # [0]으로 배열 형태에서 벡터 추출
        print("\n=== 예측 결과 ===")
        print(f"Acidity  : {y_pred[0]:.2f}")
        print(f"Sweetness: {y_pred[1]:.2f}")
        print(f"Body     : {y_pred[2]:.2f}")
    except Exception as e:
        print("❌ 예측 중 오류 발생:", e)

# --- 4. 실행 ---
if __name__ == "__main__":
    predict_cupnote()
