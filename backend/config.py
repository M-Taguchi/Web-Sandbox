import os

class DevConfig:
    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = "postgresql://{user}:{password}@{host}/{dbname}".format(**{
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv('DB_PASSWORD', "root"),
        "host": os.getenv("DB_HOST", "localhost:5432"),
        "dbname": os.getenv("DB_NAME", "db")
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

Config = DevConfig