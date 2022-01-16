from database import db
from models.card import Card, CardSchema
from flask import jsonify, abort, request
from flask_restful import Api, Resource, reqparse

cardSchema = CardSchema(many=False)

class CardApi(Resource):
  def get(self, cardId):
    """
    カードを1件取得
    """
    card = Card.query.filter_by(cardId=cardId).one()
    if card:
        return jsonify({"status": "success", "body": {"card" : cardSchema.dump(card)}})
    else:
        abort(404)

  def put(self, cardId):
    """
    カード編集
    """
    card = Card.query.filter_by(cardId=cardId).one()
    if not card:
      abort(404)
    
    # レコードの更新 オブジェクトの値を更新してcommit
    payload = Card.request.json["card"]
    card.cardTitle = payload["cardTitle"]
    card.cardContent = payload["cardContent"]
    card.categoryId = payload["categoryId"]
    card.cardOrder = payload["cardOrder"]
    db.session.commit()

    return jsonify({"status": "success","body": {"card" : cardSchema.dump(card)}})

  def delete(self, cardId):
    """
    カード削除
    """
    card = Card.query.filter_by(cardId=cardId).one()
    if not card:
      abort(404)

    # レコードの削除 deleteしてcommit
    db.session.delete(card)
    db.session.commit()

    return jsonify({"status": "success","body": {}})