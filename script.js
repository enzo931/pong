const ball = document.getElementById("ball");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");
const hitSound = document.getElementById("hitSound");
const scoreSound = document.getElementById("scoreSound");

let ballX = 390, ballY = 190;
let ballSpeedX = 4, ballSpeedY = 4;
let paddle1Y = 160, paddle2Y = 160;
let paddleSpeed = 6;
let player1Score = 0, player2Score = 0;

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballY <= 0 || ballY >= 380) ballSpeedY *= -1;
  if (ballX <= 20 && ballY >= paddle1Y && ballY <= paddle1Y + 80) {
    ballSpeedX *= -1;
    hitSound.play();
  }
  if (ballX >= 770 && ballY >= paddle2Y && ballY <= paddle2Y + 80) {
    ballSpeedX *= -1;
    hitSound.play();
  }
  if (ballX <= 0) {
    player2Score++;
    scoreSound.play();
    resetBall();
  }
  if (ballX >= 780) {
    player1Score++;
    scoreSound.play();
    resetBall();
  }
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
}

function resetBall() {
  ballX = 390;
  ballY = 190;
  ballSpeedX *= -1;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w" && paddle1Y > 0) paddle1Y -= paddleSpeed;
  if (e.key === "s" && paddle1Y < 320) paddle1Y += paddleSpeed;
  if (e.key === "ArrowUp" && paddle2Y > 0) paddle2Y -= paddleSpeed;
  if (e.key === "ArrowDown" && paddle2Y < 320) paddle2Y += paddleSpeed;
  paddle1.style.top = `${paddle1Y}px`;
  paddle2.style.top = `${paddle2Y}px`;
});

function updateScore() {
  player1ScoreEl.textContent = player1Score;
  player2ScoreEl.textContent = player2Score;
}

function gameLoop() {
  moveBall();
  updateScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();