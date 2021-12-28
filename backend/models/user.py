from database import db
from datetime import datetime
from marshmallow import Schema
from werkzeug.security import generate_password_hash, check_password_hash
"""
ユーザモデル
"""
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
  
    def set_password(self, password):
      self.password = generate_password_hash(password)
    
    def check_password(self, password):
      return check_password_hash(self.password, password)

class UserSchema(Schema):
    class Meta:
        fields = ("id", "userName")
