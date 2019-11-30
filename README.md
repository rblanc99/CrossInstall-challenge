# CrossInstall Home Challenge - Romain Blanc

This is an small webapp to read XKCD comics using XKCD API, with a few other aditionnal constraints.
This was done in 3 hours as a home project in the scope of my application to CrossInstall.

## configuration

Make sure to have [Node](https://nodejs.org/en/) installed.

Then go to the root of the application folder and :

-   Install the packages with `npm install`
-   Launch the app with `npm start`
-   Open your browser on `localhost:8000`

## Testing constraints

You can test the constraints this way :

-   Star : Comic 66 contains the word "star"
-   Animals : Comic 231 contains 3 times the word "cat".
-   -   Rhyme : Comic 188 contains the word "battlefield" which rhymes with many things [here](https://api.datamuse.com/words?rel_rhy=battlefield)

## Hypothesis

I chose to only pick the first word of 11 letters, given that there can possibly be many of those and i don't want the call to Datamuse API to be too long.
