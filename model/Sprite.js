import Block from "./Block.js";

class Sprite extends Block {
  constructor(x, y, width, height, imagePath) {
    super(x, y, width, height, imagePath);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export default Sprite;
