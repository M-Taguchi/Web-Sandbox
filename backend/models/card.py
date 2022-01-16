from database import db
from datetime import datetime
from marshmallow import Schema
"""
カードモデル
"""
class Card(db.Model):
    __tablename__ = 'cards'

    cardId = db.Column(db.Integer, primary_key=True)
    cardTitle = db.Column(db.String(32), nullable=False)
    cardContent = db.Column(db.String(256), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey('categorys.categoryId'), nullable=False)
    cardOrder = db.Column(db.Integer, autoincrement=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

class CardSchema(Schema):
    class Meta:
        fields = ("cardId", "cardTitle", "cardContent", "categoryId")
