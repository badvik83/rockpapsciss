let humanCount = 0;
let computerCount = 0;
let gameCount = 1;


const startGame = document.querySelector('#start-btn');
startGame.addEventListener("click", startServices);

function startServices() {
    alert("Let's ROCK!");
    const startBtnContent = startGame.textContent;
    startGame.textContent = "STOP GAME";

    startGame.removeEventListener("click", startServices);
    startGame.addEventListener("click", stopServices);

    // Enable all buttons
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
        button.disabled = false;
    });

    // This space is reserved for retrievieng the Number of Rounds from the DB
    // This space is reserved for retrievieng Score from the DB
    playRound();

}

function stopServices() {
    alert("Game Stopped");
    startGame.textContent = "START GAME";
    startGame.addEventListener("click", startServices);

    // Disable all other buttons on the page
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
        if (button !== startGame) {
            button.disabled = true;
        }
    });
}

function playRound() {

}

function getRandom(a) {
    return Math.floor(Math.random() * a)
}

function getComputerChoice() {
    const randomNumber = getRandom(3);
    var computerInput = 0;
    switch (randomNumber) {
        case 0:
            computerInput = `rock`;
            break;

        case 1:
            computerInput = `paper`;
            break;

        case 2:
            computerInput = `scissors`;
            break;
    }
    return computerInput;
}


