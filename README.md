# Lewis Carroll's Game of Logic
#### To initialize the app, use the command:
```
python application.py
```

#### Video Demo:  https://www.youtube.com/watch?v=yoTuJWGuTHI
#### A web application game based on a book about logic of famous writer Lewis Carroll.

apology.html renders messages as an apology to user with Jace Browning's meme generator API. The function that do
the trick is in helpers.py.

Also in helpers.py is the function that decorate routes in application.py to require login.

changepassword.html allows the user to change the password currentily in database when the user registered.

falacies.html is a tutorial page with tooltips from Javascript to help the user follow the text explanation on the svg boards.

***game.html*** is the page where **the game _actually_ happens**. The user choose a logic problem in the dropdown menu, activating
all the processes. On the board, the player has to fill the answer to the logic problem and then submit it by clicking the button.

index.html has the presentation page.

layout.html has the html layout to the other pages.

login.html is the login page.

propositions.html is another tutorial page with tooltips from Javascript to help the user follow the text explanation on the svg boards.

register.html is the page where the user registers.

syllogisms.html is another tutorial page with tooltips from Javascript to help the user follow the text explanation on the svg boards.

syllogisms.html, propositions.html and falacies.html are parallel to the first 3 sections of the book.

In the static folder we have the image used with the memegen API, the sounds used as sound effects in the game, the style.css files
that give the pages its visual effects and makes the page responsive to other devices besides desktop environments. Also, the
Javascript files which control tooltips, the sound effects, the color of the board's compartments, and compare the answer submitted
by the user and the answer received from the server.

application.py is the control file, with all the functions refered to the html pages, the database processes and
the interchange between the browser's Javascript code.

logic.db is the sqlite3 database with the problems informations: the propositions, the logical elements displayed by the tooltips, the
color to be matched answer on the board.

### Design choices
Along the way, a handful of design choices had to be made. A major one was choosing between process the user's answer on python or
Javascript. Because the game has more than one stage (1.choosing the problem, 2.marking the board, 3.submitting the answer), instead
of going back and forth server side and client side, the choice made was to getting all the problem needed information from server
when the user chooses a problem and send this information in a list to the client side, then letting Javascript do the rest of the work.

Another important design choice was the tooltips, to convey information of the board. Because the limitations of html's svg tag, the
Javascript tooltip was the only properly working element. Truth be told, it actually came to be the right choice, since it allows
to change very easily the information on the board when a different problem is chosen. It is also interesting in the sense that
not all the information is displayed at once on the board, but only the compartment information where the mouse cursor is on, giving
more focus and participation to the user.

Because Flask's session.clear function breaks flash function, flash was used only to tell the user he is logged in. Any problem
ocurring uses the memegen API. Registration, logging out are self explanatory for the user when redirected to the due route.
Password change had to be redirected to index page, so the flash function could inform the user.
