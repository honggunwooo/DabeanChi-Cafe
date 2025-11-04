from pathlib import Path
import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[1]  # backend/
MODEL_DIR = BASE_DIR / "cupnote"

MODEL_PATH = MODEL_DIR / "xgb_coffee_model.joblib"
ENCODER_PATH = MODEL_DIR / "label_encoder_coffee.joblib"

model = joblib.load(MODEL_PATH)
le = joblib.load(ENCODER_PATH)

FEATURES = ["roast", "origin", "location"]
CATEGORIES = {
    "roast": ["Light", "Medium-Light","Medium","Dark"],
    "origin": ["Ethiopia","Colombia","Brazil","Kenya"],
    "location": ["africa","asia","caribbean","cent_america","south_america"],
}

def predict(roast: str, origin: str, location: str) -> str:
    X = pd.DataFrame([[roast, origin, location]], columns=FEATURES)
    for col in FEATURES:
        X[col] = X[col].astype("category").cat.set_categories(CATEGORIES[col])
    y_encoded = model.predict(X)[0]
    return le.inverse_transform([y_encoded])[0]