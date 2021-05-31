from flask import Flask, redirect, url_for, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('anystudy')
courses = db.get_collection('courses')


@app.route('/addname/<name>/')
def addname(name):
    courses.insert_one({"name": name.lower()})
    return redirect(url_for('getnames'))

@app.route('/api/courses/random/')
def getnames():
    names_json = {}
    for doc in db.courses.aggregate([{ "$sample": { "size": 1 } }]):
      names_json = doc
    return jsonify(names_json)

if __name__ == "__main__":
    app.run(debug=True)