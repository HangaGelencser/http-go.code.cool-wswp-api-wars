from flask import Flask, redirect, render_template, request, session

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("base.html")


if __name__ == "__main__":
    app.secret_key = "jujujuj"
    app.run(
        debug=True,
        port=5003,
    )
