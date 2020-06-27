// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
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
gameEngine.gameLoop();

const app = document.querySelector("#app");
app.style.backgroundColor = "#156e15";
app.style.display = "flex";

const scoreContainer = document.createElement("div");
scoreContainer.style.border = "3px solid #f6ca46";
scoreContainer.style.width = "300px";
scoreContainer.style.display = "flex";
scoreContainer.style.flexDirection = "column";

const scoreHeader = document.createElement("p");
scoreHeader.innerText = "SCOREBOARD";
scoreHeader.style.color = "gold";
scoreHeader.style.fontSize = "28px";
scoreHeader.style.textAlign = "center";
scoreHeader.style.paddingTop = "20px";
scoreHeader.style.textDecoration = "underline";

const bankScore = document.createElement("p");
bankScore.innerText = "BANK ACCOUNT :";
bankScore.style.color = "gold";
bankScore.style.fontSize = "19px";
bankScore.style.textAlign = "left";
bankScore.style.lineHeight = "10";
bankScore.style.paddingLeft = "10px";

app.appendChild(scoreContainer);
scoreContainer.appendChild(scoreHeader);
scoreContainer.appendChild(bankScore);
