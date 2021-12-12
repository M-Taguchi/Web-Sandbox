from flask_restful import Api, Resource, reqparse

class HelloApiHandler(Resource):
  def get(self):
    return {
      "resultStatus": "SUCCESS",
      "body": {
        "user": {
          "userName": "テスト太郎",
          "message": "Hello Api Handler"
        }
      }
    }

  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("type", type=str)
    parser.add_argument("user", type=str)

    args = parser.parse_args()

    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
    request_type = args["type"]
    request_json = args["body"]
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json["message"]

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    respone = {"status": "success", "body": { "user": {"userName": "test", "message": message }}}

    return response