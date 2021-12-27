from flask import Flask, send_from_directory
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from flask_restful import Api, Resource
from api.auth import AuthLoginApi, AuthLogoutApi, AuthRefreshApi
from api.user import UserApi
from flask_cors import CORS # デプロイ時にコメント化
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from database import init_db
from init import create_init
from api.token import jwt_init

app = Flask(__name__, static_url_path="", static_folder="frontend/build")

# 設定読み込み
app.config.from_object("config.Config")

# CORS対策(デプロイ時にコメント化)
CORS(app)



# DB初期化
init_db(app)
api = Api(app)
ma = Marshmallow(app)
create_init(app)

# JWT初期化
jwt_init(app)

@app.route("/", defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,"index.html")

api.add_resource(AuthLoginApi, "/auth/login")
api.add_resource(AuthLogoutApi, "/auth/logout")
api.add_resource(AuthRefreshApi, "/auth/refresh")
api.add_resource(UserApi, "/user")