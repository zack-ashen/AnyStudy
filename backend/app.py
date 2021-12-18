from flask import Flask, redirect, request, url_for, jsonify, Response
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from google.oauth2 import id_token
from dotenv import load_dotenv
from os import environ
from os.path import join, dirname
from google.auth.transport import requests
import json
import jwt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
JWT_SECRET = environ.get("JWT_SECRET")


mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('anystudy')
courses = db.get_collection('courses')
users = db.get_collection('users')
majors = db.get_collection('majors')


@app.route('/addname/<name>/')
def addname(name):
    courses.insert_one({"name": name.lower()})
    return redirect(url_for('getnames'))


@app.route('/api/user/<user_id>')
def get_user(user_id: str):
    user = users.find_one({'_id': user_id})
    if user is None:
        return Response("{'err': 'User not found.'}", status=404, mimetype="application/json")
    return jsonify(user)


@app.route('/api/courses/random/')
def get_random_course():
    names_json = {}
    for doc in db.courses.aggregate([{"$sample": {"size": 1}}]):
        names_json = doc
    return jsonify(names_json)


@app.route('/api/majors')
def get_majors():
    major_arr = []
    for doc in majors.find():
        major_arr.append({'major': doc['major'], 'college': doc['college']})
    return jsonify(major_arr)


@app.route('/api/short-courses')
def get_courses():
    courses_arr = []
    for doc in courses.find():
        courses_arr.append(
            {'id': doc['_id'], 'title': doc['title'], 'code': doc['code']})
    return jsonify(courses_arr)


def user_exists(user_id: str):
    return users.find_one({'_id': user_id}) is not None


@app.route('/api/auth', methods=['POST'])
def login():
    body = request.get_json()
    token = body['token']
    is_login = body['login']
    client_id = body['clientId']
    try:
        id_info = id_token.verify_oauth2_token(
            token, requests.Request(), client_id)
        user_id = id_info['sub']
        signed_jwt = jwt.encode(
            {"id": user_id}, JWT_SECRET, algorithm="HS256")
        if is_login and user_exists(user_id):
            return jsonify(jwt=signed_jwt)
        if is_login and not user_exists(user_id):
            return jsonify(err="User not found"), 404
        if not is_login and user_exists(user_id):
            return jsonify(err="User exists"), 400
        name = id_info['name']
        email = id_info['email']
        users.insert_one({"_id": user_id, "name": name, "email": email})
        return jsonify(jwt=signed_jwt)
    except ValueError:
        return Response("{'err': 'Invalid token.'}", status=400, mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)
