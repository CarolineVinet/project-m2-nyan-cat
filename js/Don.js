class Don {
  constructor(theRoot, player) {
    this.root = theRoot;
    this.x = player.x;
    this.y = player.y;

    this.domElement = document.createElement("img");
    this.domElement.src = "images/donfinalgif.gif";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  donIsDead() {
    console.log(this.root);
    console.log(this.domElement);
    this.root.removeChild(this.domElement);
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y <= 0) {
    }
  }
}
