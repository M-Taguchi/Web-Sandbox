from database import db
from models.user import User, UserSchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse

user_schema = UserSchema(many=False)

class UserApi(Resource):
  def get(self):
    """
    ユーザを1件取得
    """
    id = request.args.get("id")
    result = User.query.filter_by(id=id).one()
    if result:
        return jsonify({"status": "success", "body": {"user" : user_schema.dump(result)}})
    else:
        abort(404)

  def post(self):
    """
    ユーザ登録
    """
    user = request.json["user"]
    u = User(name=user["name"])
    db.session.add(u)
    db.session.commit()

    return {
      "status": "success",
      "body": {
      }
    }