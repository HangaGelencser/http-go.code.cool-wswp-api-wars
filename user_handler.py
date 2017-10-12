import database_common
import database
import bcrypt


def get_hashed_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
    return hashed_bytes.decode("utf-8")


def check_password(plain_text_password, hashed_text_password):
    hashed_bytes_password = hashed_text_password.encode("utf-8")
    return bcrypt.checkpw(plain_text_password.encode("utf-8"), hashed_bytes_password)


def password_handler(password, confirm_password):
    if password != password_2:
        password_error_message = "Password confirmation failed"
    return password_error_message


def user_name_handler(user_name):
    users_password = database.get_users_password(user_name)
    if len(users_password) != 0:
        user_name_error_message = "That username is taken, try another one"
    return user_name_error_message


def registration_handler(user_name, password, confirm_password):
    hashed_password = get_hashed_password(password)
    database.save_user(user_name, hashed_password)
    registration_message = "Registration complete, please log in"
    return registration_message
