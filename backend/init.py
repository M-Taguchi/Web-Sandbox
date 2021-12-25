from models.user  import User
from database import db

def create_init(app):
    with app.app_context():
        db.drop_all()
        db.create_all()
        user_create()
        db.session.commit()
    
def user_create():
    # テストデータ
    from data.user import users
    for user in users:
        u = User(name=user["name"])
        db.session.add(u)