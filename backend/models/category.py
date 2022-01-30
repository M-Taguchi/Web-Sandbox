from database import db
from datetime import datetime
from marshmallow import Schema, fields
from models.card import CardSchema

"""
カテゴリモデル
"""
class Category(db.Model):
    __tablename__ = 'categorys'

    categoryId = db.Column(db.Integer, primary_key=True)
    categoryName = db.Column(db.String(32), nullable=False)
    categoryOrder = db.Column(db.Integer, autoincrement=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    cards = db.relationship("Card", backref="categorys", cascade="all")

class CategorySchema(Schema):
    class Meta:
        fields = ("categoryId", "categoryName")

class KanbanSchema(Schema):
    class Meta:
        fields = ("categoryId", "categoryName", "cards")

    cards = fields.Nested(CardSchema, many=True)