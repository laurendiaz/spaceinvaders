import Sprite from "./Sprite.js";

class Missile extends Sprite {
    constructor(x, y, width, height, image) {
        super (x, y, width, height, image);
        this.visible = true;
        this.dy = 0;
    }

    move(canvasHeight) {
        super.move(0, 7);
        this.handleBoundary(canvasHeight);
    }

    handleBoundary(canvasHeight) {
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
        }
    }

    collides(invader) {
        if (this.visible && this.intersects(invader)) {
            this.visible = false;
            invader.collides(this);
        }
    }
}

export default Missile;