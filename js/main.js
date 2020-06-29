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
gameHeader.style.color = "#3f9a3d";
gameHeader.style.fontSize = "28px";
gameHeader.style.textAlign = "center";
gameHeader.style.paddingTop = "20px";
gameHeader.style.fontFamily = "monospace";

const rules = document.createElement("p");
rules.innerText =
  " Carole Baskin says she lives to rescue those big cats, but we all know what the woman really wants is M-O-N-E-Y ! Using the arrow keys, help Carole collect as much money as possible and make sure the tigers don't eat her!";
rules.style.fontFamily = "monospace";
rules.style.color = "#3f9a3d";
rules.style.lineHeight = "1.5";
rules.style.textAlign = "center";
rules.style.fontSize = "17px";
rules.style.paddingTop = "10px";

const points = document.createElement("p");
points.innerText = "YELLOW COINS  = 1$";
points.style.color = "gold";
points.style.fontFamily = "monospace";
points.style.paddingTop = "50px";
points.style.paddingLeft = "10px";
points.style.fontSize = "20px";

const pointsTwo = document.createElement("p");
pointsTwo.innerText = "BLUE COINS  = 10$";
pointsTwo.style.color = "#3a64a9";
pointsTwo.style.fontFamily = "monospace";
pointsTwo.style.paddingLeft = "10px";
pointsTwo.style.fontSize = "20px";

const bankScore = document.createElement("p");
bankScore.id = "bankScore";
bankScore.innerText = `BANK ACCOUNT : ${gameEngine.bankAccount + "$"}`;
bankScore.style.color = "#3f9a3d";
bankScore.style.fontSize = "24px";
bankScore.style.textAlign = "left";
bankScore.style.fontFamily = "monospace";
bankScore.style.fontWeight = "bold";
bankScore.style.paddingLeft = "10px";

//'Should Carole die, restart the game using the spacebar.'
// Carole can use her special attack after collecting 50$!******(KEY TBD)*****'

app.appendChild(startButton);
app.appendChild(scoreContainer);
scoreContainer.appendChild(gameHeader);
scoreContainer.appendChild(rules);
scoreContainer.appendChild(points);
scoreContainer.appendChild(pointsTwo);
scoreContainer.appendChild(bankScore);

//gameEngine.gameLoop();
