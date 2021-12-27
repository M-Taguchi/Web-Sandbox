from os import access
from flask import request, jsonify
from flask_jwt_extended.utils import create_access_token, create_refresh_token, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from flask_jwt_extended.view_decorators import jwt_required
from flask_restful import Resource
from models.user import User, UserSchema
from database import db

class AuthLoginApi(Resource):
  """
  ログイン
  """
  def post(self):
    input_data = request.json
    user = User.query.filter_by(name=input_data["name"]).first()

    if not user or not user.check_password(input_data["password"]):
      return jsonify({"status": "failure", "body": {"message" : "IDまたはパスワードに誤りがあります"}})

    res = jsonify({"status": "success", "body": {"user" : UserSchema(many=False).dump(user)}})

    # JWTの発行とクッキーへのセット(CSRFトークンも自動的にセットされる)
    access_token = create_access_token(user.id)
    set_access_cookies(res, access_token)

    # リフレッシュトークンの保持
    # refresh_token = create_refresh_token(user.id)
    # set_refresh_cookies(res, refresh_token)

    return res

# class AuthRefreshApi(Resource):
#   """
#   トークンの再発行
#   """
#   @jwt_required(refresh=True)
#   def post(self):
#     # ログイン時にセットしたユーザID
#     current_user_id = get_jwt_identity()
#     access_token = create_access_token(current_user_id, fresh=False)

#     res = jsonify({"status": "success", "body": {}})
#     set_access_cookies(res, access_token)

#     return res

class AuthLogoutApi(Resource):
  """
  ログアウト
  """
  def post(self):
    res = jsonify({"status": "success", "body":{}})
    unset_jwt_cookies(res)
    return res