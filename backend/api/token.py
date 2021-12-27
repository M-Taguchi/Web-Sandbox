from flask_jwt_extended import (
  JWTManager, 
)
# from flask_jwt_extended.utils import get_jwt
# from flask_jwt_extended.view_decorators import verify_jwt_in_request
# from flask_restful import abort

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