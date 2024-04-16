from flask import Flask

app = Flask(__name__)

@app.route("/api/test", methods=["GET"])
def test():
    try:
        return {'res':'Hello World'}
    except Exception as e:
        print('Something went wrong.')
        print(e)
        res = {"res": "Something went wrong"}
    return res