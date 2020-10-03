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

//press space bar and construct one every time
//subtract from total missiles you have
//ignore once you get to zero

let missiles = [];
let numMissiles = 10;
document.body.onkeyup = function(e) {
  if(e.keyCode === 32 && numMissiles > 0) {
    let missile = new Missile(tank.x, tank.y, tank.width, tank.height, "./assets/missile.png");
    missiles.push(missile);
    console.log(missiles);
    numMissiles--;
    //numMissiles += missile.updateNumMissiles;
    console.log(numMissiles);
  }
}


let invaders = [];
function invade() {
  let coward = Math.floor(Math.round(Math.random()));
  let speed = Math.random()*7;
  invaders.push(new Invader(canvas.width*Math.random(), canvas.height-600, 50, 50, "./assets/invader.png", coward, speed));
}
(function loop() {
  var rand = Math.round(Math.random() * (5000 - 700));
  setTimeout(function() {
          invade();
          loop();  
  }, rand);
}());

let gameOver = 0;
let score = 0;
let deadInvaders = [];
let deadMissiles = [];
// draw (on) canvas
function draw() {
  numMissiles = 10 - missiles.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  tank.move(canvas.width);
    invaders.forEach((invader) => {
      invader.draw(ctx);
      invader.attack();
      if (invader.y === canvas.height) {
        gameOver = 1;
        console.log("game over");
        cancelAnimationFrame(draw);
      }
      missiles.forEach((missile) => {
        missile.draw(ctx);
        missile.move(canvas.height);
        if (invader.collides(missile)) {
          deadMissiles.push(missile);
          deadInvaders.push(invader);
          score++;
        } else if (missile.y + missile.height > canvas.height) {
          console.log("yes");
          deadMissiles.push(missile);
          numMissiles++;
        }
      });
    });
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Invaders Shot Down: " + score, 10, 20);
    ctx.fillText("Missiles Remaining: " + numMissiles, 10, 40)
  
  //check for every missile and every invader
  //nested loop
  // two arrays removemissiles and removeinvaders

  invaders.forEach((invader) => {
    deadInvaders.forEach((dead) => {
      if(invader === dead) {
        console.log("mhm");
        invaders.splice(invaders.indexOf(invader), 1);
      }
    });
  });
  
  missiles.forEach((missile) => {
    deadMissiles.forEach((dead) => {
      if(missile === dead) {
        console.log("meh");
        missiles.splice(missiles.indexOf(missile), 1);
      }
    });
  });

  window.requestAnimationFrame(draw);
}



draw();