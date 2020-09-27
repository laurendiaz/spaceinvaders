import Sprite from "./Sprite.js";

class Invader extends Sprite {
    constructor(x, y, height, image) {
        super (x, y, width, height, image);
        this.visible = true;
        this.fall = true;
    }

    attack (fall) {
        //if ()
    }

    collides (missile) {
        if (this.visible && this.intersects(ball)) {
            this.visible = false;
            ball.collides(this);
            return true;
        }
        return false;
    }

}

export default Invader;