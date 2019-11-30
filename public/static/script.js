let image = document.getElementById("displayed_img");
const loaderLink =
    "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif";

let currentComicNumber = getRandomInt(2235);
let iconsContainer = document.getElementById("icons");
let titleContainer = document.getElementById("title");
let numeroContainer = document.getElementById("numero");
let rhymeContainer = document.getElementById("rhyme");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function changeImg(number) {
    iconsContainer.innerHTML = "";
    image.src = loaderLink;
    titleContainer.innerHTML = "Loading...";
    numeroContainer.innerHTML = "";
    rhymeContainer.innrerHTML = "";

    const comic = await fetch(`http://localhost:8000/${number}`).then(res =>
        res.json()
    );
    const link = comic.img;
    image.src = link;

    titleContainer.innerText = comic.safe_title;
    numeroContainer.innerHTML = ` - n° ${comic.num}`;

    if (checkForStar(comic)) {
        iconsContainer.innerHTML += "<i class='material-icons'> star </i>";
    }

    const animalsNumber = checkForAnimals(comic);

    if (animalsNumber > 0) {
        for (i = 0; i < animalsNumber; i++) {
            iconsContainer.innterHTML +=
                "<i class='material-icons'> favorite </i>";
        }
    }

    const charOfLength11 = check11CharWords(comic);

    console.log(charOfLength11);

    if (charOfLength11 !== "") {
        getRhymingWords(charOfLength11).then(rhymingWords => {
            console.log(rhymingWords);
            if (rhymingWords.length === 0) {
                rhymeContainer.innerHTML = `We found a 11 characters word ! It is : <h5>${charOfLength11}</h5> <br/> But unfortunately, no word rhymes with it...`;
            } else {
                rhymeContainer.innerHTML = `We found a 11 characters word ! It is : <h5>${charOfLength11}</h5> <br/> It ryhmes with ${rhymingWords}`;
            }
        });
    }

    return number;
}

function previous() {
    currentComicNumber -= 1;
    changeImg(currentComicNumber);
}

function next() {
    currentComicNumber += 1;
    changeImg(currentComicNumber);
}

function goTo() {
    const newNumber = parseInt(document.getElementById("newNumber").value);
    document.getElementById("newNumber").value = "";
    currentComicNumber = changeImg(newNumber);
}

function checkForStar(comic) {
    for (key in comic) {
        if (
            typeof comic[key] === "string" &&
            comic[key]
                .replace(/[^A-Za-z ]/g, "")
                .toLowerCase()
                .split(" ")
                .includes("star")
        ) {
            return true;
        }
    }
    return false;
}

function checkForAnimals(comic) {
    let count = 0;
    for (key in comic) {
        if (typeof comic[key] === "string") {
            const wordsList = comic[key]
                .replace(/[^A-Za-z ]/g, "")
                .toLowerCase()
                .split(" ");
            for (let i = 0; i < wordsList.length; i++) {
                if (wordsList[i] === "cat") {
                    count++;
                }
                if (wordsList[i] === "kitten") {
                    count++;
                }
                if (wordsList[i] === "dog") {
                    count++;
                }
            }
        }
    }
    return count;
}

function check11CharWords(comic) {
    const transcript = comic.transcript.replace(/[^A-Za-z ]/g, "");
    const wordsList = transcript.toLowerCase().split(" ");
    for (let i = 0; i < wordsList.length; i++) {
        if (wordsList[i].length === 11) {
            return wordsList[i];
        }
    }
    return "";
}

async function searchStar() {
    // i used this function to find a comic with the word "star" in it. And I found the 66.
    let comic = {};
    let number = 1;
    while (!checkForStar(comic)) {
        number += 1;
        comic = await fetch(`http://localhost:8000/${number}`).then(res =>
            res.json()
        );
    }
    return comic.num;
}

async function searchAnimals() {
    let comic = {};
    let number = 26;
    while (checkForAnimals(comic) === 0) {
        number += 1;
        console.log(number);
        comic = await fetch(`http://localhost:8000/${number}`).then(res =>
            res.json()
        );
    }
    return comic.num;
}

async function getRhymingWords(word) {
    const response = await fetch(
        `http://localhost:8000/words/${word}`
    ).then(res => res.json());
    let words = [];
    response.data.forEach(element => words.push(element.word));
    return words;
}

changeImg(currentComicNumber);

document.addEventListener("keydown", e => {
    if (e.keyCode === 37) {
        previous();
    } else if (e.keyCode === 39) {
        next();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".materialboxed");
    var instances = M.Materialbox.init(elems, {});
});

//image with star : 66
