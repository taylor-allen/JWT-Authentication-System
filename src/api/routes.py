"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
Here's a list of the installs:
pipenv install 
pipenv shell
pipenv install flask
pipenv install requests
pipenv install flask-jwt-extended
pipenv run migrate //this needs to be run any time you change the models.py
pipenv run upgrade
pipenv run start // this needs to be run again any time you change the .env file
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint("api", __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/login", methods=["POST"])
def handle_login():
    data = request.get_json()
    email_value = data.get("email")
    password_value = data.get("password")

    if not email_value or not password_value:
        return jsonify({"message": "Email and password are required"}), 400

    find_user = User.query.filter_by(email=email_value).first()

    if not find_user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not check_password_hash(find_user.password, password_value):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=str(find_user.id)) #made it a string because it was sending an integer and could not process

    return jsonify(access_token=access_token), 200


@api.route("/signup", methods=["POST"])
def sign_up():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "email already exists"}), 409
    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "user created"}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()  
def protected():
    from flask_jwt_extended import get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id) 

    if user:
        return jsonify(logged_in_as=user.email, message="Access granted to protected data!"), 200
    else:
        return jsonify({"message": "User not found."}), 404
