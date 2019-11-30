# CrossInstall Home Challenge - Romain Blanc

Make sure to have Node installed.
Install the packages with `npm install`
To launch the app, get in the root folder and do `npm start`
The open your browser on `localhost:8000`

I chose to only pick the first word of 11 letters, given that there can possibly be many of those and i don't want the call to Datamuse API to be too long.

There is one big issue that i didn't have the time to tackle : the text in the transcript from the API is very dirty, so words of 11 characters can be something like something]]] and the Datamuse doesn't know that.
It is quite simple to fix, I juste have to eliminate the non-alphabetic characters but I didn't have the time.

And I also forgot to print the comic number, but it's quite simple.
I also wanted to be able to change to previous and next with the arrays on the keyboard, it's a simple document.addEventListener, but I didn't have the time either.
