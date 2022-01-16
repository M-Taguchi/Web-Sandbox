from database import db
from models.category import Category, CategorySchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from sqlalchemy import desc

categorySchema = CategorySchema(many=True)

class CategorysApi(Resource):
  def get(self):
    """
    カテゴリを全件取得
    """
    categorys = Category.query.order_by(desc("categoryOrder"))
    if categorys:
        return jsonify({"status": "success", "body": {"categorys" : categorySchema.dump(categorys)}})
    else:
        abort(404)

  def post(self):
    """
    カテゴリ登録
    """
    payload = request.json["category"]
    # レコードの登録
    category = Category(categoryName=payload["categoryName"])
    db.session.add(category)
    db.session.commit()

    return jsonify({"status": "success","body": {}})

  def put(self):
    """
    カテゴリの一括編集
    主に順番の入れ替えで使用
    """
    payloads = request.json["categorys"]
    # TODO: パフォーマンス改善
    for payload in payloads:
      category = Category.query.filter_by(categoryId=payload["categoryId"]).one()
      if not category:
        abort(404)
      category.categoryName = payload["categoryName"]
      category.categoryOrder = payload["categoryOrder"]
      db.session.commit()

    return jsonify({"status": "success","body": {}})