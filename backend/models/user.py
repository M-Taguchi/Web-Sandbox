from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from database import db
from datetime import datetime
from marshmallow import Schema
"""
ユーザモデル
"""
class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

class UserSchema(Schema):
    class Meta:
        fields = ("id", "name")

user_schema = UserSchema(many=True)

class UserApi(Resource):
  def get(self):
    """
    ユーザを1件取得
    """
    id = request.args.get("id")
    result = User.query.filter_by(id=id).all()
    if len(result) != 0: 
        return jsonify({"user" : user_schema.dump(result)})
    else:
        abort(404)
    # return {
    #   "resultStatus": "SUCCESS",
    #   "body": {
    #     "user": {
    #       "userName": "テスト太郎",
    #       "message": "Hello Api Handler"
    #     }
    #   }
    # }

  def post(self):
    """
    ユーザ登録
    """
    users = request.json["users"]
    for i in users:
        u  = User(name=i["name"])
        db.session.add(u)
    db.session.commit()

    return {
      "resultStatus": "success",
      "body": {
      }
    }
