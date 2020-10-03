import Sprite from "./Sprite.js";

class Tank extends Sprite {
    constructor(x, y, width, height, imagePath) {
        super (x, y, width, height, imagePath);
        this.dx = 0;
        // press key and hold it down
        document.addEventListener("keydown", this.keyHoldHandler.bind(this));
        // press key quickly
        document.addEventListener("keyup", this.keyTapHandler.bind(this));
    }

    keyHoldHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 7;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -7;
        }
    }

    keyTapHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 0;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = 0;
        }
    }

    move(canvasWidth) {
        super.move(this.dx, 0);
        this.handleBoundary(canvasWidth);
    }

    handleBoundary(canvasWidth) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
    }
    
}

export default Tank;