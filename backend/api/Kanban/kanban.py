from database import db
from models.category import Category, KanbanSchema
from models.card import Card
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from sqlalchemy import desc
from flask_jwt_extended.view_decorators import jwt_required

kanbanSchema = KanbanSchema(many=True)

class KanbanApi(Resource):
  @jwt_required()
  def get(self):
    """
    カンバンボードのカテゴリとカードを全件取得
    """
    kanban = Category.query.order_by(desc("categoryOrder"))
    if kanban:
        return jsonify({"status": "success", "body": {"kanban" : kanbanSchema.dump(kanban)}})
    else:
        abort(404)