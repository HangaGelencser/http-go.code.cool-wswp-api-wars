import database_common
import psycopg2
import sys
import os



@database_common.connection_handler
def save_user(cursor, user, password_hash):
    cursor.execute("""INSERT INTO star_wars_users(user_name, password) VALUES(%(user_name)s, %(password)s);""",
                   {'user_name': user, 'password': password_hash})


@database_common.connection_handler
def get_users_password(cursor, user_name):
        cursor.execute("SELECT * FROM star_wars_users WHERE user_name = %(user_name)s;",
                       {'user_name': user_name})
        return cursor.fetchall()


@database_common.connection_handler
def check_username(cursor, user, password):
    cursor.execute("""SELECT * FROM star_wars_users WHERE user_name = %(username)s AND password = %(password)s;""",
                   {'username': user, 'password': password})
    return cursor.fetchall()
