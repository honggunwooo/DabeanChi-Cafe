import joblib
import pandas as pd
import numpy as np

# 모델과 라벨 인코더 경로
MODEL_PATH = "cupnote/xgb_coffee_model.joblib"
ENCODER_PATH = "cupnote/label_encoder_coffee.joblib"

# 모델 / 라벨 인코더 로드
model = joblib.load(MODEL_PATH)
le = joblib.load(ENCODER_PATH)  # y 레이블용

# 학습 feature
feature_cols = ["roast", "origin", "location"]

# 학습 당시 category 목록 저장
# 학습 때 X_train[col].cat.categories.tolist()로 저장해둔 리스트 사용
categories_dict = {
    "roast": ["Light", 'Medium-Light',"Medium", "Dark"],
    "origin": ["Ethiopia", "Colombia", "Brazil", "Kenya"],  # 예시
    "location": ["africa", "asia", "caribbean", "cent_america", "south_america"]
}

def predict_cupnote():
    roast = input("Roast 입력: ")
    origin = input("Origin 입력: ")
    location = input("Location 입력: ")

    X_new = pd.DataFrame([[roast, origin, location]], columns=feature_cols)

    # object -> category 변환 + 학습 category 적용
    for col in feature_cols:
        X_new[col] = X_new[col].astype("category").cat.set_categories(categories_dict[col])

    # 모델 예측
    pred_encoded = model.predict(X_new)[0]

    # 숫자를 라벨로 변환
    pred_label = le.inverse_transform([pred_encoded])[0]

    print("\n===== 예측 결과 =====")
    print("예측된 향미(맛 노트):", pred_label)

if __name__ == "__main__":
    predict_cupnote()
