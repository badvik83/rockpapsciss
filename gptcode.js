const gameState = {
    playerWins: 0,
    pcWins: 0,
    gameCount: 1,
    playersChoice: "",
    pcChoice: "",
    gameStarted: false,
};

const startGame = document.querySelector('#start-btn');

// Disabling all buttons except start
function toggleButtons(state) {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
        if (button !== startGame) {
            button.disabled = state;
        }
    });
}

toggleButtons(true);

startGame.addEventListener("click", () => {
    if (gameState.gameStarted) {
        stopServices();
    } else {
        startServices();
    }
});

function startServices() {
    alert("Let's ROCK!");
    gameState.gameStarted = true;
    startGame.textContent = "STOP GAME";
    startGame.classList.add("active");

    toggleButtons(false);
    updateScore();

    playRound();
}

function stopServices() {
    alert("Game Stopped");
    gameState.gameStarted = false;
    startGame.textContent = "START GAME";
    startGame.classList.remove("active");

    toggleButtons(true);
}

function playRound() {
    const playerButtons = document.querySelectorAll(".player-field .rps-buttons");

    playerButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const playersChoiceContent = event.target.textContent;
            alert(`You threw ${playersChoiceContent}`);
            gameState.playersChoice = playersChoiceContent;
            showComputerChoice();

            if (gameState.pcChoice != "") {
                resolveRound();
            }
        });
    });
}

function resolveRound() {
    if (gameState.playersChoice === gameState.pcChoice) {
        alert("It's a TIE!");
    } else if (
        (gameState.playersChoice === "rock" && gameState.pcChoice === "scissors") ||
        (gameState.playersChoice === "paper" && gameState.pcChoice === "rock") ||
        (gameState.playersChoice === "scissors" && gameState.pcChoice === "paper")
    ) {
        gameState.playerWins++;
        alert("You won!");
    } else {
        gameState.pcWins++;
        alert("Computer won!");
    }
    gameState.gameCount++;
    updateScore();
}

function updateScore() {
    const currentScore = document.querySelector("#current-score");
    currentScore.textContent = gameState.gameCount;
}

function showComputerChoice() {
    const computerChoice = getComputerChoice();
    const pcChoiceAnimation = document.querySelector("#computer-choice-animation");
    pcChoiceAnimation.innerHTML = ""; // Clear old choice
    const imgElement = document.createElement('img');
    imgElement.classList.add("pc-choice-img");
    imgElement.src = `./images/${computerChoice}_bg.png`;  // Use dynamic image paths
    pcChoiceAnimation.appendChild(imgElement);
}

function getComputerChoice() {
    const randomNumber = getRandom(3);
    let choices = ["rock", "paper", "scissors"];
    gameState.pcChoice = choices[randomNumber];
    return gameState.pcChoice;
}

function getRandom(a) {
    return Math.floor(Math.random() * a);
}
