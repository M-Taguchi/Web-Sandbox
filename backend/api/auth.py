from os import access
from flask import request, jsonify, abort
from flask_jwt_extended.utils import create_access_token, create_refresh_token, get_csrf_token, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from flask_jwt_extended.view_decorators import jwt_required
from flask_restful import Resource
from models.user import User, UserSchema
from database import db

class AuthApi(Resource):
  """
  JWT認証チェック
  """
  @jwt_required()
  def post(self):
    return jsonify({"status": "success", "code": 200, "message" : "", "body": {}})


class AuthLoginApi(Resource):
  """
  ログイン
  """
  def post(self):
    payload = request.json
    user = User.query.filter_by(userName=payload["userName"]).first()

    if not user or not user.check_password(payload["password"]):
      return abort(401)

    # JWTの発行
    access_token = create_access_token(user.userId)
    # リフレッシュトークンの保持
    # refresh_token = create_refresh_token(user.id)

    res = jsonify({"status": "success", "code": 200, "message": "ログインに成功しました", "body": {"user" : UserSchema(many=False).dump(user), "accessCsrf": get_csrf_token(access_token)}})

    # クッキーへのセット(CSRFトークンも自動的にセットされる)
    set_access_cookies(res, access_token)
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
    res = jsonify({"status": "success", "code": 200, "message": "ログアウトに成功しました", "body":{}})
    unset_jwt_cookies(res)
    return res