import Sprite from "./Sprite.js";

class Tank extends Sprite {
    constructor(x, y, height, image) {
        super (x, y, width, height, image);
        this.dx = 0;
        // press key and hold it down
        document.addEventListener("keyhold", this.keyHoldHandler.bind(this));
        // press key quickly
        document.addEventListener("keytap", this.keyTapHandler.bind(this));
        // press space bar
        document.addEventListener("spaceBar", this.spaceBarHandler.bind(this));
    }

    keyHoldHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 7
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

    fire(missile) {
        
    }
    
}

export default Tank;