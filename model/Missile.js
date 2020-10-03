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
        super.move(0, -10); 
    }

    collides(invader) {
        if (this.intersects(invader)) {
            return true;
        }
        return false;
    }
}

export default Missile;