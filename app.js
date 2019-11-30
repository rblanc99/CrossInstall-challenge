const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const publicPath = path.join(__dirname, "/public/");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(publicPath, "static")));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "index.html"));
});

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    const comic = await getComic(id);
    res.status(200).send(comic);
});

app.get("/words/:word", async (req, res) => {
    const response = await getRhymingWords(req.params.word);
    res.status(200).send({ data: response });
});

app.get(() => {
    res.status(404).send("Error 404 : The requested page could not be found.");
});

async function getComic(number) {
    const response = await fetch(
        `http://xkcd.com/${number}/info.0.json `
    ).then(res => res.json());
    return response;
}

async function getRhymingWords(word) {
    const response = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${word}`
    ).then(res => res.json());
    let listWords = [];
    for (key in response) {
        const word = response[key].word;
        listWords.push({ word: word, length: word.length });
    }
    if (listWords.length <= 3) {
        return listWords;
    } else {
        let selectedWords = [listWords[0], listWords[1], listWords[2]];
        for (i = 3; i < listWords.length; i++) {
            if (listWords[i].length < selectedWords[0].length) {
                selectedWords[0] = listWords[i];
            } else if (listWords[i].length < selectedWords[1].length) {
                selectedWords[1] = listWords[i];
            } else if (listWords[i].length < selectedWords[2].length) {
                selectedWords[2] = listWords[i];
            }
        }
        return selectedWords;
    }
}

//getComic(1).then(res => console.log(res));

app.listen(8000, () => {
    console.log(
        "\nListening on port 8000.\n\nOpen http://localhost:8000 on your browser"
    );
});
