from database import db
from models.user import User, UserSchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended.view_decorators import jwt_required

userSchema = UserSchema(many=True)

class UsersApi(Resource):
  @jwt_required()
  def get(self):
    """
    ユーザを全件取得
    """
    users = User.query.all()
    if users:
        return jsonify({"status": "success", "body": {"users" : userSchema.dump(users)}})
    else:
        abort(404)

  @jwt_required()
  def post(self):
    """
    ユーザ登録
    """
    payload = request.json["user"]
    # レコードの登録
    user = User(userName=payload["userName"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"status": "success","body": {}})