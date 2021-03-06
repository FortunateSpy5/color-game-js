const rgbText = document.querySelector(".rgb-value");
const colors = document.querySelectorAll(".color");
const colorsContainer = document.querySelector(".colors .container");
const easyBtn = document.querySelector(".easy");
const hardBtn = document.querySelector(".hard");
const newBtn = document.querySelector(".new-colors");
const message = document.querySelector(".message");
const changeColor = document.querySelectorAll(".change");
const header = document.querySelector("header");

let easy = false;
let colorsClicked = [false, false, false, false, false, false];
let correct = 0;
let answered = false;

const reset = () => {
    const rgbValues = [];
    correct = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        colors[i].style.display = "inherit";
        colors[i].style.opacity = "1";
    }

    ar = [0, 1, 2, 3, 4, 5];
    ar.splice(correct, 1);
    if (easy) {
        let count = 0;
        while (count < 3) {
            const temp = Math.floor(Math.random() * ar.length);
            colors[ar[temp]].style.display = "none";
            ar.splice(temp, 1);
            count += 1;
        }
    }

    for (let i = 0; i < 6; i++) {
        rgbValues.push(getRgb());
        setColor(colors[i], rgbValues[i]);
    }

    rgbText.textContent =
        rgbValues[correct][0] +
        ", " +
        rgbValues[correct][1] +
        ", " +
        rgbValues[correct][2];

    colorsContainer.style.display = "grid";

    header.style.background = "#3B76A9";
    message.textContent = "";
    answered = false;
};

const getRgb = () => {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
    ];
};

const setColor = (color, rgb) => {
    color.style.background =
        "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
};

window.onload = reset;

easyBtn.addEventListener("click", function () {
    if (!easy) {
        easy = true;
        reset();
        easyBtn.classList.add("clicked");
        hardBtn.classList.remove("clicked");
    }
});

hardBtn.addEventListener("click", function () {
    if (easy) {
        easy = false;
        reset();
        easyBtn.classList.remove("clicked");
        hardBtn.classList.add("clicked");
    }
});

newBtn.addEventListener("click", function () {
    reset();
});

for(let i = 0; i < 6; i++) {
    colors[i].addEventListener("click", function() {
        console.log(i);
        if (correct == i) {
            message.textContent = "Correct!";
            changeColor.forEach(function(element) {
                element.style.background = colors[correct].style.background;
            })
            answered = true;
        }
        else if (!answered) {
            message.textContent = "Try Again";
            colors[i].style.opacity= "0";
        }
    });
}