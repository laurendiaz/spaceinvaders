import Sprite from "./Sprite.js";

class Invader extends Sprite {
    constructor(x, y, width, height, imagePath, coward, speed) {
        super (x, y, width, height, imagePath);
        this.coward = coward
        this.speed = speed;
    }

    attack () {
        if (this.coward === 1) {
            super.move(0, this.speed);
        }
    }

    collides (missile) {
        if (this.intersects(missile)) {
            return true;
        }
        return false;
    }
}

export default Invader;