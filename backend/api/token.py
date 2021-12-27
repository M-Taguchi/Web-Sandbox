from flask_jwt_extended import (
  JWTManager, 
)
# from flask_jwt_extended.utils import get_jwt
# from flask_jwt_extended.view_decorators import verify_jwt_in_request
# from flask_restful import abort
from flask import jsonify

jwt = JWTManager()

# アクセストークン設定
# returnの内容がjwtの"sub"に入る
@jwt.user_identity_loader
def identity_user(id):
  return id

# claims追加
# @jwt.additional_claims_loader
# def add_claims_to_access_token(identity):
#     return {
#     }

# app初期化
def jwt_init(app):
  jwt.init_app(app)

# トークンの有効期限切れ時の挙動
@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    token_type = expired_token["type"]

    if token_type == "access":
        return jsonify({"status": "error", "code": 401, "message": "アクセストークンの期限切れ", "body": {}})
    else:
        return jsonify({"status": "error", "code": 401, "message": "リフレッシュトークンの期限切れ", "body": {}})

# 無効な形式のトークン時の挙動
@jwt.invalid_token_loader
def my_invalid_token_callback(error_string):
    return jsonify({"status": "error", "code": 401, "message": "無効な形式のトークン", "body": {}})

# 認証エラー時の挙動
@jwt.unauthorized_loader
def my_unauthorized_callback(error_string):
    return jsonify({"status": "error", "code": 401, "message": "", "body": {}})

# @jwt_requiredが付与されている関数の実行前に起動する
# @jwt_requiredを付与した関数の中で、current_user変数でここでreturnする値を参照できる
# @jwt.user_lookup_loader
# def lookup_user(_jwt_header, jwt_data):
#     identity = jwt_data["sub"]
#     return User.query.filter_by(id=identity).one_or_none()

# アクセス制限用のデコレータ作成
# 管理者のみアクセス可能なエンドポイント
# def admin_required(fn):
#   @wraps(fn)
#   def wrapper(*args, **kwargs):
#     verify_jwt_in_request()
#     claims = get_jwt()
#     if claims["is_admin"] == 1:
#       return fn(*args, **kwargs)
#     else:
#       return abort()
#   return wrapper