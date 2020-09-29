import Sprite from "./Sprite.js";

class Missile extends Sprite {
    constructor(x, y, height, image) {
        super (x, y, width, height, image);
        this.visible = true;
        this.dy = 0;
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }

    spacebarHandler(e, tank) {
        this.visible = true;
        this.dy = 7;
    }

    collides(invader) {
        if (this.visible && this.intersects(invader)) {
            this.visible = false;
            invader.collides(this);
        }
    }
}

export default Missile;