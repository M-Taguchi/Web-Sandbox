from flask import Flask, send_from_directory
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from flask_restful import Api, Resource
from backend.api.auth import AuthLoginApi, AuthApi, AuthLogoutApi
from backend.api.Users.users import UsersApi
from backend.api.Users.user import UserApi
from backend.api.Categorys.categorys import CategorysApi
from backend.api.Categorys.category import CategoryApi
from backend.api.Cards.cards import CardsApi
from backend.api.Cards.card import CardApi
from backend.api.Kanban.kanban import KanbanApi
from flask_cors import CORS # デプロイ時にコメント化
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from backend.database import init_db
from backend.init import create_init
from backend.api.token import jwt_init
from backend.config import Config

app = Flask(__name__, static_url_path="../", static_folder="../frontend/build")

# 設定読み込み
app.config.from_object("config.Config")

# CORS対策(デプロイ時にコメント化)
if Config.ENV == "development":
    CORS(app,resources={"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# DB初期化
# init_db(app)
# api = Api(app)
# ma = Marshmallow(app)
# create_init(app)

# JWT初期化
jwt_init(app)

@app.route("/", defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,"index.html")

api.add_resource(AuthApi, "/api/auth")
api.add_resource(AuthLoginApi, "/api/auth/login")
api.add_resource(AuthLogoutApi, "/api/auth/logout")
# api.add_resource(AuthRefreshApi, "/api/auth/refresh")
api.add_resource(UsersApi, "/api/users")
api.add_resource(UserApi, "/api/users/<int:userId>")
api.add_resource(CategorysApi, "/api/categorys")
api.add_resource(CategoryApi, "/api/categorys/<int:categoryId>")
api.add_resource(CardsApi, "/api/cards")
api.add_resource(CardApi, "/api/cards/<int:cardId>")
api.add_resource(KanbanApi, "/api/kanban/")