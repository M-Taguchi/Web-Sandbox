from models.user  import User
from models.category  import Category
from database import db

def create_init(app):
    with app.app_context():
        db.drop_all()
        db.create_all()
        user_create()
        category_create()
        db.session.commit()
    
def user_create():
    # テストデータ
    from data.user import users
    for user in users:
        u = User(userName=user["userName"])
        u.set_password(user["password"])
        db.session.add(u)

def category_create():
    # テストデータ
    from data.category import categorys
    for category in categorys:
        c = Category(categoryName=category["categoryName"])
        db.session.add(c)