import re
import os
import ssl

# Bypass SSL verification issues for NLTK downloads
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Configure writable directory for NLTK data (handles local & serverless filesystems)
nltk_dir = os.path.join('/tmp', 'nltk_data') if os.name != 'nt' else os.path.join(os.path.expanduser('~'), 'nltk_data')
try:
    os.makedirs(nltk_dir, exist_ok=True)
except Exception:
    pass

if nltk_dir not in nltk.data.path:
    nltk.data.path.append(nltk_dir)

# Safely attempt NLTK data downloads
for resource in ['stopwords', 'wordnet']:
    try:
        nltk.data.find(f'corpora/{resource}')
    except LookupError:
        try:
            nltk.download(resource, download_dir=nltk_dir, quiet=True)
        except Exception:
            try:
                nltk.download(resource, quiet=True)
            except Exception:
                pass

DEFAULT_STOPWORDS = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
    'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she',
    'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that',
    'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an',
    'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
    'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
    'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
    'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
    't', 'can', 'will', 'just', 'don', 'should', 'now'
}

def get_stopwords():
    try:
        return set(stopwords.words('english'))
    except Exception:
        return DEFAULT_STOPWORDS

def preprocess_text(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = text.split()
    stop_words = get_stopwords()
    
    try:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    except Exception:
        tokens = [word for word in tokens if word not in stop_words]
        
    return " ".join(tokens)

def extract_keywords(text):
    if not text:
        return []
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = text.split()
    stop_words = get_stopwords()
    return [word for word in tokens if word not in stop_words]

