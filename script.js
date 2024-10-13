console.log(`Hello World!`);

let humanCount = 0;
let computerCount = 0;
let gameCount = 1;

function getHumanChoice() {
    const humanInput = prompt(`R, P or S?`);
    switch (humanInput) {
        case `r`:
            return (`rock`);
        case `p`:
            return (`paper`);
        case `s`:
            return (`scissor`);
    }
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
    for (let b = 1; b <= 5; b++) {
        console.log(`Game Round #` + b)
        if (b == 5) {
            console.log(`Last Round`);
        }
        playRound();
        if (b == 5) {
            if (humanCount > computerCount) {
                console.log(`You won this round`);
            }
            else if (humanCount < computerCount) { console.log(`Computer won this round`); }
            else {
                console.log(`It's a Tie round`);
            }
        }
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

playGame();
