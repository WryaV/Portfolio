

let dino = document.getElementById("dino");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let playAgainButton = document.getElementById("play-again");
let score = 0;
let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;
let gameInterval;
let obstacleSpeed = 5;

function startGame() {
  obstacle.style.right = '0px'; // Reset obstacle position
  dino.style.bottom = '0px';
  dino.style.left = '0px'; // Reset dino position
  score = 0;
  obstacleSpeed = 5;
  scoreDisplay.textContent = "Score: " + score;
  playAgainButton.style.display = 'none';
  gameInterval = setInterval(updateGame, 20);
}

function updateGame() {
  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let dinoLeft = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  // Move dino horizontally based on key press
  if (isMovingLeft && dinoLeft > 0) {
    dino.style.left = (dinoLeft - 5) + "px";
  }
  if (isMovingRight && dinoLeft < 760) { // Limit movement within game box width
    dino.style.left = (dinoLeft + 5) + "px";
  }

  // Check for collision
  if (obstacleRight > (750 - dinoLeft) && obstacleRight < (780 - dinoLeft) && dinoBottom <= 30) {
    clearInterval(gameInterval);
    playAgainButton.style.display = 'block';
    alert("Game Over! Your score: " + score);
    return;
  }

  // Move obstacle from right to left
  if (obstacleRight >= 800) {
    obstacle.style.right = '0px';
    score++;
    scoreDisplay.textContent = "Score: " + score;
    if (score % 5 === 0) {
      obstacleSpeed += 1;
    }
  } else {
    obstacle.style.right = (obstacleRight + obstacleSpeed) + "px";
  }
}

// Reset game function to reinitialize values and restart the game
function resetGame() {
  isJumping = false;
  isMovingLeft = false;
  isMovingRight = false;
  startGame();
}

// Jump function for the dinosaur
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 0;
  let goingUp = true;

  let jumpInterval = setInterval(() => {
    if (goingUp) {
      jumpHeight += 5;
      if (jumpHeight >= 100) goingUp = false;
    } else {
      jumpHeight -= 5;
      if (jumpHeight <= 0) {
        clearInterval(jumpInterval);
        jumpHeight = 0;
        isJumping = false;
      }
    }
    dino.style.bottom = jumpHeight + "px";
  }, 20);
}

// Handle keydown events for movement
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") jump();
  if (event.code === "ArrowLeft") isMovingLeft = true;
  if (event.code === "ArrowRight") isMovingRight = true;
});

// Handle keyup events to stop movement
document.addEventListener("keyup", function(event) {
  if (event.code === "ArrowLeft") isMovingLeft = false;
  if (event.code === "ArrowRight") isMovingRight = false;
});

// Start the game when the page loads
startGame();
   
function toggleInfo(section) {
    const extraInfo = document.getElementById(section);
    if (extraInfo.style.display === "none" || extraInfo.style.display === "") {
        extraInfo.style.display = "block";
    } else {
        extraInfo.style.display = "none";
    }
}