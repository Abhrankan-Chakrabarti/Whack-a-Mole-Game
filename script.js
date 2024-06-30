const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');
const startButton = document.getElementById('startButton');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.querySelector('.mole').classList.add('up');
    setTimeout(() => {
        hole.querySelector('.mole').classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 30000); // Game duration: 30 seconds
}

function bonk(e) {
    if (!e.isTrusted) return; // Prevent fake clicks
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);