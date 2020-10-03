import Sprite from "./Sprite.js";

class Missile extends Sprite {
    constructor(x, y, width, height, image) {
        super (x, y, width, height, image);
        this.dy = 0;
    }

    draw(canvasHeight) {
        super.draw(canvasHeight);
    }

    move(canvasHeight) {
        super.move(0, -7);
        //this.handleBoundary(canvasHeight);
    }

    updateNumMissiles(canvasHeight) {
        if (this.y < 0) {
            return 1;
        } else {
            return 0;
        }
    }

    collides(invader) {
        if (this.intersects(invader)) {
            return true;
        }
        return false;
    }
}

export default Missile;