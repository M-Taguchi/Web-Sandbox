from database import db
from models.user import User, UserSchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended.view_decorators import jwt_required

userSchema = UserSchema(many=False)

class UserApi(Resource):
  @jwt_required()
  def get(self, userId):
    """
    ユーザを1件取得
    """
    user = User.query.filter_by(userId=userId).one()
    if user:
        return jsonify({"status": "success", "body": {"user" : userSchema.dump(user)}})
    else:
        abort(404)

  @jwt_required()
  def put(self, userId):
    """
    ユーザ編集
    """
    user = User.query.filter_by(userId=userId).one()
    if not user:
      abort(404)
    
    # レコードの更新 オブジェクトの値を更新してcommit
    payload = User.request.json["user"]
    user.userName = payload["userName"]
    user.password = payload["password"]
    db.session.commit()

    return jsonify({"status": "success","body": {"user" : userSchema.dump(user)}})

  @jwt_required()
  def delete(self, userId):
    """
    ユーザ削除
    """
    user = User.query.filter_by(userId=userId).one()
    if not user:
      abort(404)

    # レコードの削除 deleteしてcommit
    db.session.delete(user)
    db.session.commit()

    return jsonify({"status": "success","body": {}})