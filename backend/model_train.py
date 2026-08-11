import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import pickle
import os

def create_dummy_data():
    data = [
        {"text": "high fever body ache chills sweating joint pain muscle pain 3 days", "label": "Malaria-like illness"},
        {"text": "fever shivering chills headache fatigue back pain vomiting", "label": "Malaria-like illness"},
        {"text": "high fever severe headache retro-orbital eye pain rash joint pain body pain", "label": "Dengue-like illness"},
        {"text": "fever skin rash low blood platelet symptoms bleeding nose joint pain", "label": "Dengue-like illness"},
        {"text": "fever cough sore throat runny nose muscle body aches tiredness fatigue headache", "label": "Influenza-like illness"},
        {"text": "sudden onset fever severe fatigue chills muscle ache dry cough nasal congestion", "label": "Influenza-like illness"},
        {"text": "prolonged fever stomach pain weakness headache diarrhea constipation rose spots loss of appetite", "label": "Typhoid-like illness"},
        {"text": "continuous fever abdominal discomfort weakness abdominal pain gastrointestinal symptoms", "label": "Typhoid-like illness"},
        {"text": "sneezing runny nose nasal congestion sore throat mild fever mild body ache", "label": "Common Cold / viral respiratory infection"},
        {"text": "stomach cramps diarrhea nausea vomiting abdominal discomfort fever loss of appetite", "label": "Gastrointestinal infection"},
        {"text": "sneezing watery eyes itchy eyes runny nose skin allergic reaction rash", "label": "Allergy-related illness"},
        {"text": "throat irritation dry cough sneezing allergy symptoms hives", "label": "Allergy-related illness"}
    ]
    return pd.DataFrame(data)

def train_model():
    df = create_dummy_data()
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
        ('clf', LogisticRegression())
    ])
    pipeline.fit(df['text'], df['label'])
    
    os.makedirs('model', exist_ok=True)
    with open('model/model.pkl', 'wb') as f:
        pickle.dump(pipeline, f)
    print("Model trained and saved to model/model.pkl")

if __name__ == '__main__':
    train_model()
