const board = document.querySelector(".board");
const startbtn = document.querySelector(".btn-start");
const restartbtn = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startgame = document.querySelector(".start-game");
const gameover = document.querySelector(".game-over");

const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

let intervalId = null;
const blocks = {};
let direction = "down";

let snake = [{ x: 1, y: 3 }];
let food = randomFood();

/* ---------------- GRID ---------------- */

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

/* ---------------- HELPERS ---------------- */

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
        b.classList.remove("fill", "food");
    });
}

/* ---------------- RENDER ---------------- */

function render() {
    const head = getNextHead();

    // WALL COLLISION
    if (
        head.x < 0 || head.x >= rows ||
        head.y < 0 || head.y >= cols
    ) {
        endGame();
        return;
    }

    // SELF COLLISION
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // FOOD
    if (head.x === food.x && head.y === food.y) {
        food = randomFood();
    } else {
        snake.pop();
    }

    clearBoard();

    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.forEach(seg => {
        blocks[`${seg.x}-${seg.y}`].classList.add("fill");
    });
}

/* ---------------- GAME CONTROL ---------------- */

function startGame() {
    clearInterval(intervalId);
    modal.style.display = "none";
    intervalId = setInterval(render, 300);
}

function endGame() {
    clearInterval(intervalId);
    modal.style.display = "flex";
    startgame.style.display = "none";
    gameover.style.display = "flex";
}

function restartGame() {
    clearInterval(intervalId);
    snake = [{ x: 1, y: 3 }];
    direction = "down";
    food = randomFood();
    clearBoard();
    modal.style.display = "none";
    intervalId = setInterval(render, 300);
}

/* ---------------- EVENTS ---------------- */

startbtn.addEventListener("click", startGame);
restartbtn.addEventListener("click", restartGame);

window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});
