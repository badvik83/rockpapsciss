console.log(`Hello World!`);

let humanCount = 0;
let computerCount = 0;
let gameCount = 1;

function getHumanChoice() {
    const humanInput = prompt(`R, P or S?`);
    return (humanInput.toLowerCase());
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
            computerInput = `scissor`;
            break;
    }
    return computerInput;
}

function playGame() {
    console.log(`Game Round` + gameCount)
    gameCount++;
    if (gameCount == 5) {
        console.log(`Last Game`);
    }
}

function playRound() {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    console.log(computerChoice);

    if (humanChoice == computerChoice) {
        console.log(`It's a tie`);
    }
    else if ((humanChoice == `rock` && computerChoice == `paper`)
        || (humanChoice == `paper` && computerChoice == `scissor`)
        || (humanChoice == `scissor` && computerChoice == `rock`)) {
        computerCount++;
        console.log(`Computer won this time!`);
    }
    else {
        humanCount++;
        console.log(`You won this time!`);
    }
};

for (let a = 0; a < 5; a++) {
    playGame();
    for (let b = 0; b < 5; b++) {
        playRound();
        if (b == 4) {
            if (humanCount > computerCount) {
                console.log(`You won this round`);
            }
            else if (humanCount < computerCount) { console.log(`Computer won this round`); }
            else {
                console.log(`It's a Tie round`);
            }
        }
    }
    if (a == 4) {
        if (humanCount > computerCount) {
            console.log(`You won this Game`);
        }
        else if (humanCount < computerCount) { console.log(`Computer won this Game`); }
        else {
            console.log(`It's a Tie Game`);
        }
    }
}
