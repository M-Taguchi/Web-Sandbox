from database import db
from models.category import Category, CategorySchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended.view_decorators import jwt_required

categorySchema = CategorySchema(many=False)

class CategoryApi(Resource):
  @jwt_required()
  def get(self, categoryId):
    """
    カテゴリを1件取得
    """
    category = Category.query.filter_by(categoryId=categoryId).one()
    if category:
        return jsonify({"status": "success", "body": {"category" : categorySchema.dump(category)}})
    else:
        abort(404)

  @jwt_required()
  def put(self, categoryId):
    """
    カテゴリ編集
    """
    category = Category.query.filter_by(categoryId=categoryId).one()
    if not category:
      abort(404)
    
    # レコードの更新 オブジェクトの値を更新してcommit
    payload = Category.request.json["category"]
    category.categoryName = payload["categoryName"]
    category.categoryOrder = payload["categoryOrder"]
    db.session.commit()

    return jsonify({"status": "success","body": {"category" : categorySchema.dump(category)}})

  @jwt_required()
  def delete(self, categoryId):
    """
    カテゴリ削除
    """
    category = Category.query.filter_by(categoryId=categoryId).one()
    if not category:
      abort(404)

    # レコードの削除 deleteしてcommit
    db.session.delete(category)
    db.session.commit()

    return jsonify({"status": "success","body": {}})