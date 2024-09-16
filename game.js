const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
const canvasSize = 400;
let snake, dx, dy, food, score, gameOver;
let speed = 150; // Increase this value to slow down the game
let intervalId;

function initGame() {
    // Clear any existing interval
    if (intervalId) {
        clearInterval(intervalId);
    }

    snake = [{ x: 200, y: 200 }];
    dx = grid;
    dy = 0;
    food = { x: 100, y: 100 };
    score = 0;
    gameOver = false;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';

    // Start a new interval
    intervalId = setInterval(draw, speed);
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));
    
    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
    
    // Move the snake
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / grid)) * grid,
            y: Math.floor(Math.random() * (canvasSize / grid)) * grid
        };
    } else {
        snake.pop();
    }
    
    // Check for collisions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
        snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y)) {
        gameOver = true;
        document.getElementById('scoreDisplay').textContent = score;
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('retryButton').style.display = 'block';
        clearInterval(intervalId); // Stop the game
    }
}

function changeDirection(event) {
    if (event.code === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -grid;
    } else if (event.code === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = grid;
    } else if (event.code === 'ArrowLeft' && dx === 0) {
        dx = -grid;
        dy = 0;
    } else if (event.code === 'ArrowRight' && dx === 0) {
        dx = grid;
        dy = 0;
    }
}

function restartGame() {
    initGame();
}

document.addEventListener('keydown', changeDirection);
initGame();
