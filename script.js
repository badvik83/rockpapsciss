let humanCount = 0;
let computerCount = 0;
let gameCount = 1;


const startGame = document.querySelector('#start-btn');

// disabling all buttons until START is clicked
function disableAllButtons() {
    const disableAllBtns = document.querySelectorAll("button");
    disableAllBtns.forEach((button) => {
        if (button !== startGame) {
            button.disabled = true;
        }
    });
}

disableAllButtons();

startGame.addEventListener("click", startServices);

function startServices() {
    alert("Let's ROCK!");
    startGame.textContent = "STOP GAME";
    startGame.style.backgroundColor = 'red';

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
    startGame.style.backgroundColor = 'green';
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

    const playerButtons = document.querySelectorAll(".player-field .rps-buttons");

    playerButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const playersChoiceContent = event.target.textContent;
            alert(`You threw ${playersChoiceContent}`);
            showComputerChoice();
        });
    });


}

function showComputerChoice() {
    const computerChoice = getComputerChoice();
    alert(`Computer threw ${computerChoice}`);
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


