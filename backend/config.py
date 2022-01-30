import os

class DevConfig:
    # Flask
    ENV = "development"
    DEBUG = True

    # JSONのレスポンスボディの日本語文字化け対策
    JSON_AS_ASCII = False

    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = "postgresql://{user}:{password}@{host}/{dbname}".format(**{
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv('DB_PASSWORD', "root"),
        "host": os.getenv("DB_HOST", "localhost:5432"),
        "dbname": os.getenv("DB_NAME", "db")
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # Flask-JWT-Extended
    JWT_TOKEN_LOCATION = ["cookies"]
    # クッキーのpath属性
    JWT_ACCESS_COOKIE_PATH = "/api/"
    # JWT_REFRESH_COOKIE_PATH = "/api/auth/refresh"
    # GET以外のときにCSRFトークンチェックを行うか
    JWT_COOKIE_CSRF_PROTECT = True
    # JWT署名鍵
    JWT_SECRET_KEY = b"ChangeMe"
    # CSRF対策
    JWT_COOKIE_SAMESITE = "Strict"
    # 二重送信対策
    JWT_CSRF_IN_COOKIES = True

class ProdConfig:
    # Flask
    ENV = "production"
    DEBUG = False

    # JSONのレスポンスボディの日本語文字化け対策
    JSON_AS_ASCII = False

    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = "postgresql://{user}:{password}@{host}/{dbname}".format(**{
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv('DB_PASSWORD', "root"),
        "host": os.getenv("DB_HOST", "localhost:5432"),
        "dbname": os.getenv("DB_NAME", "db")
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # Flask-JWT-Extended
    JWT_TOKEN_LOCATION = ["cookies"]
    # クッキーのpath属性
    JWT_ACCESS_COOKIE_PATH = "/api/"
    # JWT_REFRESH_COOKIE_PATH = "/api/auth/refresh"
    # GET以外のときにCSRFトークンチェックを行うか
    JWT_COOKIE_CSRF_PROTECT = True
    # JWT署名鍵
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", b"ChangeMe")
    # CSRF対策
    JWT_COOKIE_SAMESITE = "Strict"
    # 二重送信対策
    JWT_CSRF_IN_COOKIES = True

Config = ProdConfig