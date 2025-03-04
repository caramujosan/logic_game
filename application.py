import os, json, re

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required

# Regular expression email format
regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'


print("Iniciating Flask application...")
# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///logic.db")


print("Routes defined.")
@app.route("/")
@login_required
def index():
    """Show presentation page"""

    return render_template("index.html")



@app.route("/game", methods=["GET", "POST"])
@login_required
def game():
    """The Game page"""

    problems = db.execute("SELECT first_premise FROM problems")

    if request.method == "GET":
        return render_template("game.html", problems=problems)



# trading data between back and frontend
@app.route("/get_server_data", methods = ['POST'])
@login_required
def get_server_data():

    first_premises = db.execute("SELECT first_premise FROM problems")

    # getting data from client side
    jsdata = request.form['javascript_data']


    premises = []

    for first_premise in first_premises:
        for premise in first_premise.values():
            premises.append(premise)

    #check if data from client match data from database
    if jsdata not in premises:

        return apology("missing logic problem", 400)

    # if matches, return data
    else:
        problems = db.execute("""SELECT * FROM big_diagram
                        JOIN small_diagram ON small_diagram_id = problem_id
                        JOIN problems ON problem_id=big_diagram_id WHERE first_premise=(?)""", jsdata)

        values = []

        for row in problems:
            for value in row.values():
                values.append(value)

        return json.dumps(values)



@app.route("/propositions")
@login_required
def propositions():
    """Propositions page"""

    return render_template("propositions.html")



@app.route("/syllogisms")
@login_required
def syllogisms():
    """Syllogisms page"""

    return render_template("syllogisms.html")



@app.route("/falacies", methods=["GET", "POST"])
@login_required
def falacies():
    """Falacies page"""

    return render_template("falacies.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("usermail"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        usermail = request.form.get("usermail")

        password = request.form.get("password")

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE usermail = ?", usermail)

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            return apology("invalid email and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        flash("You are logged in")

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        logged_out = ["You are not logged in.",  "If don't have an account, you can register.", "If already registered, go inside and have fun !"]

        return render_template("login.html", logged_out=logged_out)


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    usermail = request.form.get("usermail")

    password = request.form.get("password")

    confirmation = request.form.get("confirmation")

    if request.method == "POST":

        # Ensure username was submitted
        if not usermail:
            return apology("must provide email", 400)

        # Check if email is valid
        elif not (re.search(regex, usermail)):
            return apology("must provide valid email", 400)

        # Ensure password was submitted
        elif not password or not confirmation:
            return apology("must provide password", 400)

        elif len(password) < 8:
            return apology("password must be at least 8 elements long")

        elif password != confirmation:
            return apology("password do not match")

        else:
            # Query database for username
            rows = db.execute("SELECT * FROM users WHERE usermail = ?", usermail)

            # Check if a username and/or password already exists
            for row in rows:
                if len(rows) != 0:
                    return apology("invalid username and/or password", 400)

            # if not, register user
            else:
                hash_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

                db.execute("INSERT INTO users (usermail, hash) VALUES(?, ?)", usermail, hash_password)

                # Redirect user to home page
                return redirect("/login")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")



@app.route("/changepassword", methods=["GET", "POST"])
@login_required
def changepassword():
    """Change user password"""

    old_password = request.form.get("oldPassword")

    new_passwrod = request.form.get("newPassword")

    confirm_password = request.form.get("confirm")

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("oldPassword"):
            return apology("must provide password", 403)

        # Ensure password was submitted
        elif not request.form.get("newPassword"):
            return apology("must provide new password", 403)

        elif not request.form.get("confirm"):
            return apology("must confirm new password", 403)

        elif len(password) < 8:
            return apology("password must be at least 8 elements long")

        elif new_passwrod != confirm_password:
            return apology("password do not match")

        else:

            # Query database for username
            rows = db.execute("SELECT * FROM users WHERE id = ?", session["user_id"])

            # Check if a username and/or password already exists
            for row in rows:
                if len(rows) != 1:
                    return apology("invalid password", 400)

            # if not, change user password
            else:
                hash_password = generate_password_hash(new_passwrod, method='pbkdf2:sha256', salt_length=8)
                db.execute("UPDATE users SET hash=? WHERE id=?", hash_password, session["user_id"])

                flash("Password changed")

                # Redirect user to home page
                return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("changepassword.html")



def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)


if __name__ == "__main__":
    print("Executando o servidor Flask...")
    app.run()