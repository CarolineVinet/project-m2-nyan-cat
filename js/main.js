// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

const startButton = document.createElement("button");
startButton.innerText = "Start!";
startButton.style.backgroundColor = "gold";
startButton.style.height = "130px";
startButton.style.width = "200px";
startButton.style.fontFamily = "monospace";
startButton.style.borderRadius = "10px";
startButton.style.fontSize = "32px";
startButton.style.fontWeight = "bold";
startButton.style.position = "absolute";
startButton.style.top = "250px";
startButton.style.left = "535px";

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  gameEngine.gameLoop();
});

const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  console.log(event.code);

  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }

  if (event.code === "ArrowUp") {
    gameEngine.player.moveUp();
  }

  if (event.code === "ArrowDown") {
    gameEngine.player.moveDown();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game

const app = document.querySelector("#app");
app.style.backgroundColor = "#3f384a";
app.style.display = "flex";

const scoreContainer = document.createElement("div");
scoreContainer.style.border = "3px solid #f6ca46";
scoreContainer.style.width = "300px";
scoreContainer.style.display = "flex";
scoreContainer.style.flexDirection = "column";

const gameHeader = document.createElement("p");
gameHeader.innerText = "LET'S MAKE CAROLE RICH!";
gameHeader.style.color = "#c3e4c2";
gameHeader.style.fontSize = "28px";
gameHeader.style.textAlign = "center";
gameHeader.style.paddingTop = "20px";
gameHeader.style.fontFamily = "monospace";

const rules = document.createElement("p");
rules.innerText =
  " Carole Baskin says she lives to rescue those big cats, but all she really wants is M-O-N-E-Y !";
rules.style.fontFamily = "monospace";
rules.style.color = "#c3e4c2";
rules.style.lineHeight = "1";
rules.style.textAlign = "center";
rules.style.fontSize = "17px";
rules.style.paddingTop = "10px";

const rules2 = document.createElement("p");
rules2.innerText =
  "Using the arrow keys, help Carole collect as much money as possible and make sure the tigers don't eat her!";
rules2.style.fontFamily = "monospace";
rules2.style.color = "#c3e4c2";
rules2.style.lineHeight = "1";
rules2.style.textAlign = "center";
rules2.style.fontSize = "17px";
rules2.style.paddingTop = "10px";

const rules3 = document.createElement("p");
rules3.innerText =
  "You win the game when Carole feeds her husband to a tiger and inherits his money! You can throw Don by pressing the X key, but only if Carole has at least 20$ in the bank! ";
rules3.style.fontFamily = "monospace";
rules3.style.color = "#c3e4c2";
rules3.style.lineHeight = "1";
rules3.style.textAlign = "center";
rules3.style.fontSize = "17px";
rules3.style.paddingTop = "10px";

const yellowDiv = document.createElement("div");
yellowDiv.style.display = "flex";
yellowDiv.style.paddingLeft = "20px";
yellowDiv.style.alignContent = "center";

const yellowDivImg = document.createElement("img");
yellowDivImg.src = "/images/finalcoingif.gif";

const points = document.createElement("p");
points.innerText = " = 1$";
points.style.color = "gold";
points.style.fontFamily = "monospace";
points.style.textAlign = "center";
points.style.paddingLeft = "10px";
points.style.fontSize = "20px";

const blueDiv = document.createElement("div");
blueDiv.style.display = "flex";

const blueDivImg = document.createElement("img");
blueDivImg.src = "/images/bluecoingif.gif";

const pointsTwo = document.createElement("p");
pointsTwo.innerText = " = 10$";
pointsTwo.style.color = "#78a7f3";
pointsTwo.style.fontFamily = "monospace";
pointsTwo.style.textAlign = "center";
pointsTwo.style.paddingLeft = "10px";
pointsTwo.style.fontSize = "20px";

const cashDiv = document.createElement("div");
cashDiv.style.display = "flex";
cashDiv.style.position = "relative";
cashDiv.style.top = "115";
cashDiv.style.paddingLeft = "5px";

const cashDivImg = document.createElement("img");
cashDivImg.src = "/images/moneystack.png";

const bankScore = document.createElement("p");
bankScore.id = "bankScore";
bankScore.innerText = `  ${gameEngine.bankAccount + "$"}`;
bankScore.style.color = "#73f16f";
bankScore.style.fontSize = "20px";
bankScore.style.textAlign = "center";
bankScore.style.fontFamily = "monospace";
bankScore.style.paddingTop = "20px";
bankScore.style.paddingLeft = "10px";

const rules4 = document.createElement("p");
rules4.innerText =
  " Press the spacebar to reset the game after either Carole or Don has died.";
rules4.style.fontFamily = "monospace";
rules4.style.color = "#c3e4c2";
rules4.style.lineHeight = "1";
rules4.style.textAlign = "center";
rules4.style.fontSize = "17px";
rules4.style.paddingTop = "10px";

app.appendChild(startButton);
app.appendChild(scoreContainer);

scoreContainer.appendChild(gameHeader);
scoreContainer.appendChild(rules);
scoreContainer.appendChild(rules2);
scoreContainer.appendChild(rules3);
scoreContainer.appendChild(rules4);
scoreContainer.appendChild(yellowDiv);
yellowDiv.appendChild(yellowDivImg);
yellowDiv.appendChild(points);
scoreContainer.appendChild(blueDiv);
blueDiv.appendChild(blueDivImg);
blueDiv.appendChild(pointsTwo);
scoreContainer.appendChild(cashDiv);
cashDiv.appendChild(cashDivImg);
cashDiv.appendChild(bankScore);
