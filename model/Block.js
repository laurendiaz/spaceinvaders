class Block {
    constructor(x, y, width, height, image) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.image = image;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.image;
      ctx.fill();
      ctx.closePath();
    }
  }

  export default Block;