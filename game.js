// Storing reference of canvas to variable and setting a 2d rendering context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Define Ball starting position
let x = canvas.width/2;
let y = canvas.height-30;
// Define Ball movement velocity
let dx = 2;
let dy = -2;
// Define ball size
let ballRadius = 10;

// Define certain paddle parameters.
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

// Declare variables to determine if left or right arrow keys are pressed 
let rightPressed = false;
let leftPressed = false;

// Brick Variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0};
  }
}

// Draw Functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function testLoop() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      console.log(`(${c}, ${r})`);
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
      let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = '0095dd';
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw() {
  // Drawing Code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();

  // Object position checks and collision detection
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height-ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert('GAME OVER');
      document.location.reload();
      clearInterval(interval);
    }
  }

  // Move paddle if there is input
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}


// Functions to handle key press events
function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
let interval = setInterval(draw, 10);