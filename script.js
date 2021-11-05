var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

const botoes = document.querySelectorAll(".btn");
botoes.forEach((botao) =>
    botao.addEventListener("click", function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    })
);

async function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function await () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.getElementById("level-title").textContent =
            "Game Over, Press Any Key to Restart";

        setTimeout(function await () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = `Level + ${level}`;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    setInterval(gamePattern.forEach((color) => computerPlay(color)),5000);
    for (let i = 0; i < gamePattern.length; i++){
        
    }
    function computerPlay(color) {
        document.getElementById(color).classList.toggle(color);
        setTimeout(function () {
            document.getElementById(color).classList.toggle(color);
        }, 500);
        playSound(color);
    }
}


function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
