// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    //this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.coins = [];
    this.bluecoins = [];
    this.loopCounter = 0;
    this.bankAccount = 0;
    this.attackAllowed = false;
    this.don = undefined;
    this.gameHasEnded = false;
    this.deadSound = document.createElement("audio");
    this.carolScreamSound = document.createElement("audio");

    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (!this.player) {
      this.player = new Player(this.root);
    }

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.coins.forEach((coin) => {
      coin.update(timeDiff);
    });

    this.bluecoins.forEach((bluecoin) => {
      bluecoin.update(timeDiff);
    });

    // console.log(this.don);

    if (this.don && this.don.dead === false) {
      console.log(this.don);
      this.don.update(timeDiff);
    }

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.coins = this.coins.filter((coin) => {
      return !coin.destroyed;
    });

    this.bluecoins = this.bluecoins.filter((bluecoin) => {
      return !bluecoin.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    while (this.coins.length < MAX_COINS) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const coinSpot = nextCoinSpot(this.coins);
      this.coins.push(new Coin(this.root, coinSpot));
    }

    while (
      this.bluecoins.length < MAX_BLUECOINS &&
      this.loopCounter % 500 === 0
    ) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const bluecoinSpot = nextBlueCoinSpot(this.bluecoins);
      this.bluecoins.push(new BlueCoin(this.root, bluecoinSpot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.player.domElement.src = "images/blood2.gif";
      setTimeout(() => {
        this.player.domElement.style.display = "none";
      }, 900);
      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          this.player.domElement.src = "images/cutecarole.png";
          this.bankAccount = 0;
          this.player.domElement.style.display = "";
          this.gameHasEnded = false;
          this.gameLoop();
        }
      });
      return;
    }

    this.coinCollect();
    this.blueCoinCollect();

    if (this.don && this.don.dead === false) {
      this.tigerEatsDon();
    }

    if (this.bankAccount >= 10 && this.attackAllowed === false) {
      this.attackAllowed = true;
      document.addEventListener("keydown", (event) => {
        if (event.code === "KeyX") {
          console.log("this.root", this.root);
          this.don = new Don(this.root, this.player);
        }
      });
    }

    const bankScore = document.getElementById("bankScore");
    bankScore.innerText = `  ${this.bankAccount + "$"}`;
    this.loopCounter += 1;

    if (this.gameIsOver()) {
      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          this.bankAccount = 0;
          this.gameHasEnded = false;
          this.gameLoop();
        }
      });
    } else {
      setTimeout(this.gameLoop, 20);
    }
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let playerHasLost = false;
    const playerXPosition = this.player.x;
    const playerYPosition = this.player.y;

    this.enemies.forEach((enemy) => {
      if (
        enemy.y + ENEMY_HEIGHT > playerYPosition &&
        enemy.y < playerYPosition + PLAYER_HEIGHT &&
        enemy.x + ENEMY_WIDTH > playerXPosition &&
        enemy.x < playerXPosition + PLAYER_WIDTH
      ) {
        enemy.enemySound.play();
        this.player.playerSound.play();
        playerHasLost = true;
      }
    });
    return playerHasLost;
  };

  coinCollect = () => {
    const playerXPosition = this.player.x;
    const playerYPosition = this.player.y;
    this.coins.forEach((coin) => {
      if (
        coin.y + COIN_HEIGHT > playerYPosition &&
        coin.y < playerYPosition + PLAYER_HEIGHT &&
        coin.x + COIN_WIDTH > playerXPosition &&
        coin.x < playerXPosition + PLAYER_WIDTH
      ) {
        this.root.removeChild(coin.domElement);
        coin.destroyed = true;
        this.bankAccount += 1;
        coin.coinSound.play();
        // console.log("coin", this.bankAccount);
      }
    });
  };

  blueCoinCollect = () => {
    const playerXPosition = this.player.x;
    const playerYPosition = this.player.y;
    this.bluecoins.forEach((bluecoin) => {
      if (
        bluecoin.y + COIN_HEIGHT > playerYPosition &&
        bluecoin.y < playerYPosition + PLAYER_HEIGHT &&
        bluecoin.x + COIN_WIDTH > playerXPosition &&
        bluecoin.x < playerXPosition + PLAYER_WIDTH
      ) {
        this.root.removeChild(bluecoin.domElement);
        bluecoin.destroyed = true;
        this.bankAccount += 10;
        bluecoin.coinSound.play();
        // console.log("bluecoin", this.bankAccount);
      }
    });
  };

  tigerEatsDon = () => {
    const donXPosition = this.don.x;
    const donYPosition = this.don.y;
    this.enemies.forEach((enemy, index) => {
      if (
        enemy.y + ENEMY_HEIGHT > donYPosition &&
        enemy.y < donYPosition + DON_HEIGHT &&
        enemy.x + ENEMY_WIDTH > donXPosition &&
        enemy.x < donXPosition + DON_WIDTH
      ) {
        this.don.donIsDead();
        this.bankAccount += 7000000;
      }
    });
  };
  gameIsOver = () => {
    if (
      this.don &&
      this.don.dead === true &&
      this.bankAccount >= 500 &&
      this.gameHasEnded === false
    ) {
      setTimeout(() => {
        alert(
          "CONGRATS, YOU'VE KILLED YOUR HUSBAND AND INHERITED HIS MONEY! YOU'RE RICH! GAME OVER!!!!"
        );
      }, 500);
      this.gameHasEnded = true;
      return true;
    }
    return false;
  };
}
