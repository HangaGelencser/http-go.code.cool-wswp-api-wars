from flask import Flask, redirect, render_template, request, session
import database
import database_common
import user_handler

app = Flask(__name__)
app.secret_key = "jujujuj"


@app.route("/")
def index():
    return render_template("base.html")


@app.route("/sign_in", methods=["POST"])
def sign_in():
    return render_template("registration.html")


@app.route("/registration", methods=["POST"])
def registration():
    user_name = request.form["username"]
    password = request.form["psw"]
    password_2 = request.form["psw2"]
    users_password = database.get_users_password(user_name)
    if password != password_2:
        password_error_message = user_handler.password_handler(password, password_2)
        return render_template("registration.html", error=password_error)
    elif len(users_password) != 0:
        user_name_error_message = "That username is taken, try another one"
        return render_template("registration.html", error=user_name_error_message)
    else:
        registration_message = user_handler.registration_handler(user_name, password, password_2)
        return render_template("base.html", reg_message=registration_message)


@app.route("/login", methods=["POST"])
def log_in():
    user_name = request.form['log_username']
    password = request.form['log_psw']
    user_info = database.get_users_password(user_name)
    check_password = user_handler.check_password(user_info, password)
    print(check_password)
    if check_password:
        session['user'] = user_info[0]["user_name"]
        welcome = "Welcome " + user_info[0]["user_name"]
        return render_template('base.html', welcome=welcome)
    else:
        error = "Wrong username or password"
        return render_template('base.html', error=error)


@app.route('/logout')
def logout():
    session.pop('user')
    return redirect('/')

if __name__ = (__main__):
    app.secret_key = "jujujuj"
    app.run(
        debug=True,
        port=5000
    )
