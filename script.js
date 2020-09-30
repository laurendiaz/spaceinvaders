import Invader from "./model/Invader.js";
import Missile from "./model/Missile.js";
import Tank from "./model/Tank.js";

/**
 * tank should move right and left at bottom of 
 * screen when you press the arrow keys
 * 
 * tank should fire missiles straight up from its 
 * current position when you press the space bar
 * 
 * the invaders should appear randomly along the 
 * top of the screen and move down on a straight 
 * vertical trajectory
 * 
 * when a missile hits an invader, it destroys it
 * 
 * when an invader reaches the bottom of the screen, 
 * the game is over
 */

 // make canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// tank
const timage = new Image(50, 50);
timage.src = "./assets/tank.png";
const tank = new Tank(canvas.width/2, canvas.height - 30, 10, timage);

// are these going to be constants??
// // invader
// const iimage = new Image(50, 50);
// iimage.src = "./assets/invader.png";
// const invader = new Invader(canvas.width*Math.random(), canvas.height, 10, iimage);

// // missile
// const mimage = new Image(50, 50);
// mimage.src = "./assets/missile.png";
// // make 10 missiles? or just one and call it max 10 times?

const invaders = [];
const maxMissile = 10;
//is there a max number of invaders that will be on the canvas at once?

let count = 0;
while(count < 10) {

}

let score = 0;

// draw canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Tank.draw(ctx);
  Tank.move(canvas.width);
  Missile.collides(Invader);
  invaders.forEach((Invader) => {
    Invader.draw(ctx);
    score += Invader.collides(Missile);
  });
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
  ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
  // what does this do??
  window.requestAnimationFrame(draw);
}

const interval = setInterval(draw, 10);
document.addEventListener("gameover", (_e) => {
  clearInterval(interval);
  window.alert("Game Over!");
});

draw();