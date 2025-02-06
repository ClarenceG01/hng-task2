const highContrastColors = [
  "rgba(255, 0, 0, 1)",
  "rgba(0, 255, 0, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(255, 255, 0, 1)",
  "rgba(0, 255, 255, 1)",
  "rgba(255, 0, 255, 1)",
  "rgba(0, 0, 0, 1)",
  "rgba(128, 0, 0, 1)",
  "rgba(128, 128, 0, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(128, 0, 128, 1)",
  "rgba(0, 128, 128, 1)",
  "rgba(0, 0, 128, 1)",
];

const targetDiv = document.getElementById("target-div");
const optionDiv = document.querySelectorAll(".color-div");
const colorOptions = document.getElementsByClassName("color-options")[0];
let scoreCount = document.getElementById("score-count");
const gameInstruction = document.getElementById("game-instruction");
const resultMessage = document.getElementById("result-message");
const gameOver = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-game");

let trialCount = 4;
resultMessage.style.display = "none";
let targetColor = "";
function getRandomColor() {
  let randomNumber = Math.floor(Math.random() * highContrastColors.length);
  return highContrastColors[randomNumber];
}
function loadGame() {
  gameOver.style.display = "none";
  colorOptions.style.display = "flex";
  // random color for the target color div
  targetColor = getRandomColor();
  targetDiv.style.backgroundColor = targetColor;
  // random index that will be the correct color
  let randomIndex = Math.floor(Math.random() * optionDiv.length);
  console.log("randomIndex" + randomIndex);
  // set that will store the colors that are already used and will be used to avoid duplicates
  const usedColors = new Set();
  usedColors.add(targetColor);

  optionDiv.forEach((div, index) => {
    if (index === randomIndex) {
      div.style.backgroundColor = targetColor;
    } else {
      let randomColor = getRandomColor();
      while (usedColors.has(randomColor)) {
        randomColor = getRandomColor();
      }
      div.style.backgroundColor = randomColor;
      usedColors.add(randomColor);
    }
  });
}
// load game when the page is loaded
loadGame();

//Let the game begin
optionDiv.forEach((div) => {
  div.addEventListener("click", () => {
    if (div.style.backgroundColor === targetDiv.style.backgroundColor) {
      scoreCount.textContent++;
      resultMessage.style.display = "block";
      resultMessage.style.color = "green";
      resultMessage.textContent = "Correct!!🎉 Keep going";
      trialCount = 4;
      // reload the game
      loadGame();
    } else {
      console.log("ama hapa");
      do {
        trialCount--;
        resultMessage.style.display = "block";
        resultMessage.style.color = "red";
        resultMessage.textContent = `Incorrect !! ${trialCount} attempts remaining`;
        gameInstruction.style.display = "none";
      } while (trialCount < 0);
      if (trialCount === 0) {
        gameOver.style.display = "block";
        colorOptions.style.display = "none";
      }
    }
  });
});

restartBtn.addEventListener("click", () => {
  trialCount = 4;
  resultMessage.style.display = "none";
  scoreCount.textContent = 0;
  gameOver.style.display = "none";
  gameInstruction.style.display = "block";
  loadGame();
});
