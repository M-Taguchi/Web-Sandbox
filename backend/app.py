from flask import Flask, send_from_directory
from flask_restful import Api, Resource
from models.user import UserApi
from flask_cors import CORS # デプロイ時にコメント化
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
app.config.from_object("config.Config")

# DB初期化
db = SQLAlchemy()
db.init_app(app)


#データベースのURIはデータベース名に合わせて適宜変更する
# db_uri = "postgresql://" + os.path.join(app.root_path, "flasknote.db")
# app.config['SQLALCHEMY_DATABASE_URI'] = db_uri # 追加
# db = SQLAlchemy(app)

# デプロイ時にコメント化
CORS(app)
api = Api(app)

@app.route("/", defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,"index.html")

api.add_resource(UserApi, "/flask/hello")