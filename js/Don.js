class Don {
  constructor(theRoot, player) {
    this.root = theRoot;
    this.x = player.x;
    this.y = player.y;

    this.dead = false;

    this.domElement = document.createElement("img");
    this.domElement.src = "images/dontransparent.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  donIsDead() {
    console.log("DON IS DEAD");
    this.dead = true;
    this.domElement.src = "images/blood2.gif";
    setTimeout(() => {
      this.root.removeChild(this.domElement);
    }, 1000);
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y <= 0) {
      this.dead = true;
      this.root.removeChild(this.domElement);
    }
  }
}
