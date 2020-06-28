// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 2 * PLAYER_WIDTH;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 70;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement("img");
    this.domElement.src = "images/cutecarole.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in MAIN.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.transform = "scaleX(1)";
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.transform = "scaleX(-1)";
  }

  moveDown() {
    if (this.y + PLAYER_HEIGHT < GAME_HEIGHT - 70) {
      this.y = this.y + PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }

  moveUp() {
    if (this.y > 0) {
      this.y = this.y - PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }
}
