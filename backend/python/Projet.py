#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests

#url = 'http://localhost:3000/run-python'
#my_data = {'key': 'value'}
#response = requests.post(url, json=my_data)
#print(response.text)


# In[2]:


import spacy
import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient


# Load the French-language spaCy model
nlp = spacy.load('fr_core_news_sm')

# Connect to MongoDB (assuming it is running on the default port on localhost)
client = MongoClient('localhost', 27017)
db = client['Forum']  # Replace with your database name
questions_collection = db['questions']  # Replace with your collection name

# Function to preprocess the text
def preprocess(text):
    doc = nlp(text)
    lemmas = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct and not token.is_space]
    return ' '.join(lemmas)

# Fetch questions from MongoDB and preprocess them
mongo_questions = list(questions_collection.find({},{'contenu': 1}))
questions_db = [q['contenu'] for q in mongo_questions]  # Replace 'question_text' with your field name
preprocessed_db_questions = [preprocess(q) for q in questions_db]

# TF-IDF Vectorization
vectorizer = TfidfVectorizer()
vectorizer.fit(preprocessed_db_questions)
tfidf_matrix = vectorizer.transform(preprocessed_db_questions)

# User input processing
my_input = sys.stdin.readline().strip()

#user_question = input("saisir votre question !!  ")
preprocessed_user_question = preprocess(my_input)
user_question_vectorized = vectorizer.transform([preprocessed_user_question])

# Calculate cosine similarities
cosine_similarities = cosine_similarity(user_question_vectorized, tfidf_matrix).flatten()

# Retrieve similar questions
# Add a threshold if needed to filter out low similarity scores
similar_questions_indices = cosine_similarities.argsort()[::-1]
similar_questions = [(questions_db[index], cosine_similarities[index]) for index in similar_questions_indices]

# Show the results
# print("\nQuestions similaires trouvées dans la base de données :")
# for question, score in similar_questions:
#     if score > 0.1:  # You can adjust or remove the threshold
#         print(f"- {question} (score de similarité: {score:.2f})")

# Au lieu d'imprimer, retournez les résultats en tant que JSON

similar_questions_thresholded = [
     
     {"contenu": question, "score": float(score)}
     for question, score in similar_questions if score > 0.1
]
# Afficher les résultats sous forme de JSON pour que Node.js puisse l'interpréter
if similar_questions_thresholded:
    print(json.dumps(similar_questions_thresholded))
else:
    print(json.dumps({"message": "Aucune question similaire n'a été trouvée."}))


# In[ ]:




