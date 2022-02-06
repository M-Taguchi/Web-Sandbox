from database import db
from models.card import Card, CardSchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse
from sqlalchemy import desc
from flask_jwt_extended.view_decorators import jwt_required

cardsSchema = CardSchema(many=True)

cardSchema = CardSchema(many=False)

class CardsApi(Resource):
  @jwt_required()
  def get(self):
    """
    カードを全件取得
    パラメータが指定されていた場合には、そのcategoryIdに紐づいたカードのみを取得
    """
    payload = request.json["card"]
    cards = Card.query.filter_by(categoryId=payload["categoryId"]).order_by(desc("cardOrder"))
    if cards:
        return jsonify({"status": "success", "body": {"cards" : cardsSchema.dump(cards)}})
    else:
        abort(404)

  @jwt_required()
  def post(self):
    """
    カード登録
    """
    payload = request.json["card"]
    # レコードの登録
    card = Card(cardTitle=payload["cardTitle"], cardContent=payload["cardContent"], categoryId=payload["categoryId"])
    db.session.add(card)
    db.session.commit()

    return jsonify({"status": "success","body": {"card": cardSchema.dump(card)}})

  @jwt_required()
  def put(self):
    """
    カードの一括編集
    主に順番の入れ替えで使用
    """
    payloads = request.json["cards"]
    # TODO: パフォーマンス改善
    for payload in payloads:
      card = Card.query.filter_by(cardId=payload["cardId"]).one()
      if not card:
        abort(404)
      card.cardTitle = payload["cardTitle"]
      card.cardContent = payload["cardContent"]
      card.categoryId = payload["categoryId"]
      card.cardOrder = payload["cardOrder"]
      db.session.commit()

    return jsonify({"status": "success","body": {}})