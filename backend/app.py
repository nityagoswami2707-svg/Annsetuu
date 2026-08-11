from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
from nlp_service import preprocess_text, extract_keywords
from model_train import train_model

app = Flask(__name__)
CORS(app)

model_path = 'model/model.pkl'
if not os.path.exists(model_path):
    train_model()

with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('symptoms', '')
    if not text:
        return jsonify({"error": "No symptoms provided"}), 400
    
    processed_text = preprocess_text(text)
    keywords = extract_keywords(text)
    
    # Get probabilities
    probs = model.predict_proba([processed_text])[0]
    classes = model.classes_
    
    # Get top 3 predictions
    top_indices = probs.argsort()[-3:][::-1]
    predictions = [
        {
            "condition": classes[i],
            "probability": float(probs[i]),
            "similarity": float(probs[i]) * 100
        }
        for i in top_indices
    ]
    
    return jsonify({
        "predictions": predictions,
        "keywords": keywords,
        "guidance": "Rest and drink plenty of fluids. Consult a doctor if symptoms persist.",
        "disclaimer": "AI tool for educational/health-assistance purposes, not a confirmed medical diagnosis or prescription."
    })

@app.route('/api/metrics', methods=['GET'])
def metrics():
    # Dummy metrics
    return jsonify({
        "accuracy": 0.85,
        "precision": 0.84,
        "recall": 0.86,
        "f1_score": 0.85
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
