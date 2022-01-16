from database import db
from datetime import datetime
from marshmallow import Schema
from werkzeug.security import generate_password_hash, check_password_hash
"""
カテゴリモデル
"""
class Category(db.Model):
    __tablename__ = 'categorys'

    categoryId = db.Column(db.Integer, primary_key=True)
    categoryName = db.Column(db.String(128), nullable=False)
    order = db.Column(db.Integer, autoincrement=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

class CategorySchema(Schema):
    class Meta:
        fields = ("categoryId", "categoryName")
