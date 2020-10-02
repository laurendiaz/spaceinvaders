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
const tank = new Tank(canvas.width/2, canvas.height - 60, 50, 50, "./assets/tank.png");

// invader
const invader = new Invader(canvas.width/2, canvas.height - 60, 50, 50, "./assets/invader.png");

const maxMissile = 10;
let gameOver = 0;
//is there a max number of invaders that will be on the canvas at once?

//press space bar and construct one every time
//subtract from total missiles you have
//ignore once you get to zero
let missiles = 10;
let score = 0;
document.addEventListener('keyup', event => {
  if(event.code === 'Space' && missiles > 0) {
    let missile = new Missile(tank.x, tank.y, tank.width, tank.height, "./assets/missile.png");
    missile.draw(ctx);
    missile.move(canvas.height);
    missiles--;
    console.log(missiles);
    console.log('space pressed');
  }
})

function invaders() {
  console.log("pls");
  let coward = Math.floor((Math.random() * 1) +0.5);
  let invaders = new Invader(canvas.width/Math.random(), canvas.height, 50, 50, "./assets/invader.png");
  invaders.draw(ctx);
  invaders.attack(coward);
}

(function loop() {
  var rand = Math.round(Math.random() * (3000 - 500));
  setTimeout(function() {
          invaders();
          loop();  
  }, rand);
}());

// draw (on) canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
  invader.draw(ctx);
  window.requestAnimationFrame(draw);
}

draw();