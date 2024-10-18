let playerWins = 0;
let pcWins = 0;
let gameCount = 1;
let playersChoice = "";
let pcChoice = "";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.prefentDefault();

    const username = document.getElementById("username").ariaValueMax;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('.login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Habndle successful login
            alert('Login successful!');
            //window.location.href = '/.'
        } else {
            //Display error message
            document.getElementById("login-error").style.display = 'block';
        }
    }
    catch (error) {
        alert('Error', error);
    }
});

const startGame = document.querySelector('#start-btn');

// disabling all buttons until START is clicked
function toggleButtons(state) {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
        if (button !== startGame) {
            button.disabled = state;
        }
    });
}

toggleButtons(true);

startGame.addEventListener("click", startServices);

function startServices() {
    alert("Let's ROCK!");
    startGame.textContent = "STOP GAME";
    startGame.style.backgroundColor = 'red';

    //removing eventlisteners to not duplicate the calls
    startGame.removeEventListener("click", startServices);

    startGame.addEventListener("click", stopServices);

    // Enable all buttons
    toggleButtons(false);

    // This space is reserved for retrievieng the Number of Rounds from the DB
    //Temporary code
    let currentScore = document.querySelector("#current-score");
    const scoreContent = document.createElement("div");
    currentScore.appendChild(scoreContent);
    currentScore.textContent = gameCount;

    // This space is reserved for retrievieng Score from the DB
    playRound();

}

function stopServices() {
    alert("Game Stopped");
    startGame.textContent = "START GAME";
    startGame.style.backgroundColor = 'green';
    //removing eventlisteners to not duplicate the calls
    startGame.removeEventListener("click", stopServices);
    startGame.addEventListener("click", startServices);

    // Disable all other buttons on the page
    toggleButtons(true);
}

function playRound() {

    const playerButtons = document.querySelectorAll(".player-field .rps-buttons");

    playerButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const playersChoiceContent = event.target.textContent;
            alert(`You threw ${playersChoiceContent}`);
            playersChoice = playersChoiceContent;
            showComputerChoice();

            playersChoice = playersChoice.toLowerCase();
            if (pcChoice != "") {
                if (playersChoice == pcChoice) {
                    alert("No one wins, it's a TIE");
                }
                else if ((playersChoice == "rock" && pcChoice == "scissors")
                    || (playersChoice == "paper" && pcChoice == "rock")
                    || (playersChoice == "scissors" && pcChoice == "paper")
                ) {
                    playerWins++;
                    alert("Congratulations, You won!");
                }
                else {
                    pcWins++;
                    alert("Sorry, Computer won!");
                }
                gameCount++;
            }
            // This is a temporary code for retrieving the Game count
            let currentScore = document.querySelector("#current-score");
            const scoreContent = document.createElement("div");
            currentScore.appendChild(scoreContent);
            currentScore.textContent = gameCount;
        });
    });
}

function showComputerChoice() {
    const computerChoice = getComputerChoice();
    alert(`Computer threw ${computerChoice}`);
    let pcChoiceAnimation = document.querySelector("#computer-choice-animation");
    pcChoiceAnimation.innerHTML = ""; // Clearing any previous animations
    const imgElement = document.createElement('img');
    imgElement.classList.add("pc-choice-img");

    if (computerChoice === "rock") {
        imgElement.src = "./images/rock_bg.png";
    } else if (computerChoice === "paper") {
        imgElement.src = "./images/paper_bg.png";
    } else if (computerChoice === "scissors") {
        imgElement.src = "./images/scissors_bg.png";
    }
    pcChoiceAnimation.appendChild(imgElement);
}

function getRandom(a) {
    return Math.floor(Math.random() * a)
}

function getComputerChoice() {
    const randomNumber = getRandom(3);
    let computerInput = 0;
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
    pcChoice = computerInput;
    return computerInput;
}


