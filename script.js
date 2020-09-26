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
const tank = new Tank();
const tank = new Image(50, 50);
tank.src = "./assets/tank.png";

// invader
const invader = new Image(50, 50);
invader.src = "./assets/invader.png";

// missile
const missile = new Image(50, 50);
missile.src = "./assets/missile.png"

// draw canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tank, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
  window.requestAnimationFrame(draw);
}

draw();