import Sprite from "./Sprite.js";

class Invader extends Sprite {
    constructor(x, y, width, height, imagePath) {
        super (x, y, width, height, imagePath);
        this.visible = true;
        this.fall = true;
    }

    // attack (fall) {
    //     if (fall === 1) {
            
    //     }
    // }

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