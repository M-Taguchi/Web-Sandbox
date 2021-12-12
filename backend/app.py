from flask import Flask, send_from_directory
from flask_restful import Api, Resource
from models.user import UserApi
from flask_cors import CORS # デプロイ時にコメント化
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from database import init_db
from init import create_init


app = Flask(__name__, static_url_path="", static_folder="frontend/build")
app.config.from_object("config.Config")

# DB初期化
init_db(app)
api = Api(app)
ma = Marshmallow(app)
create_init(app)

# デプロイ時にコメント化
CORS(app)
api = Api(app)

@app.route("/", defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,"index.html")

api.add_resource(UserApi, "/user")