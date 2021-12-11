from flask import Flask, send_from_directory
from flask_restful import Api, Resource
from api.HelloApiHandler import HelloApiHandler
from flask_cors import CORS # デプロイ時にコメント化

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
# デプロイ時にコメント化
CORS(app)
api = Api(app)

@app.route("/", defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,"index.html")

api.add_resource(HelloApiHandler, "/flask/hello")