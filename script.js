const board = document.querySelector(".board");
const startbtn = document.querySelector(".btn-start");
const restartbtn = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startgame = document.querySelector(".start-game");
const gameover = document.querySelector(".game-over");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timeEl = document.getElementById("time");

const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

let gameInterval = null;
let timerInterval = null;
const blocks = {};
let direction = "down";

let snake = [{ x: 1, y: 3 }];
let food = randomFood();

let score = 0;
let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;
let elapsedSeconds = 0;

scoreEl.textContent = score;
highScoreEl.textContent = highScore;
timeEl.textContent = "00:00";

/* ---------- GRID ---------- */

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

/* ---------- HELPERS ---------- */

function randomFood() {
    return {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };
}

function getNextHead() {
    const head = snake[0];

    if (direction === "left") return { x: head.x, y: head.y - 1 };
    if (direction === "right") return { x: head.x, y: head.y + 1 };
    if (direction === "up") return { x: head.x - 1, y: head.y };
    return { x: head.x + 1, y: head.y };
}

function clearBoard() {
    Object.values(blocks).forEach(b => {
        b.classList.remove("fill", "food", "head", "up", "down", "left", "right");
    });
}

/* ---------- TIMER ---------- */

function startTimer() {
    stopTimer();
    elapsedSeconds = 0;
    updateTime();

    timerInterval = setInterval(() => {
        elapsedSeconds++;
        updateTime();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function updateTime() {
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    timeEl.textContent = `${minutes}:${seconds}`;
}

/* ---------- RENDER ---------- */

function render() {
    const head = getNextHead();

    if (
        head.x < 0 || head.x >= rows ||
        head.y < 0 || head.y >= cols
    ) {
        endGame();
        return;
    }

    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;

        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }

        food = randomFood();
    } else {
        snake.pop();
    }

    clearBoard();

    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.forEach((seg, index) => {
        const block = blocks[`${seg.x}-${seg.y}`];
        if (index === 0) {
            block.classList.add("head", direction);
        } else {
            block.classList.add("fill");
        }
    });
}

/* ---------- GAME CONTROL ---------- */

function startGame() {
    clearInterval(gameInterval);

    score = 0;
    elapsedSeconds = 0;
    scoreEl.textContent = score;
    updateTime();

    modal.style.display = "none";
    startgame.style.display = "flex";
    gameover.style.display = "none";

    startTimer();
    gameInterval = setInterval(render, 300);
}

function endGame() {
    clearInterval(gameInterval);
    stopTimer();

    modal.style.display = "flex";
    startgame.style.display = "none";
    gameover.style.display = "flex";
}

function restartGame() {
    clearInterval(gameInterval);
    stopTimer();

    score = 0;
    elapsedSeconds = 0;
    scoreEl.textContent = score;
    updateTime();

    snake = [{ x: 1, y: 3 }];
    direction = "down";
    food = randomFood();

    clearBoard();

    modal.style.display = "none";
    startgame.style.display = "flex";
    gameover.style.display = "none";

    startTimer();
    gameInterval = setInterval(render, 300);
}

/* ---------- EVENTS ---------- */

startbtn.addEventListener("click", startGame);
restartbtn.addEventListener("click", restartGame);

window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});
