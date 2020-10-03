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

// creating music
function sound(path) {
  this.sound = document.createElement("audio");
  this.sound.src = path;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function() {
    this.sound.play();
  }

  this.stop = function() {
    this.sound.pause();
  }

}
let backgroundMusic = new sound("./assets/music.mpeg");
let explosion = new sound("./assets/explosion.wav");
let pewpew = new sound("./assets/shoot.wav");


// make canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// creating tank
const tank = new Tank(canvas.width/2, canvas.height - 60, 50, 50, "./assets/tank.png");

// creating missiles
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

// creating invaders
let invaders = [];
function invade() {
  backgroundMusic.play();
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
let requestID;

// draw (on) canvas
function draw() {
  if(gameOver === 0) {
    //numMissiles = 10 - missiles.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tank.draw(ctx);
    tank.move(canvas.width);
      invaders.forEach((invader) => {
        invader.draw(ctx);
        invader.attack(Math.floor(Math.random() * (1 - (-1) + 1)) + (-1));
        if (invader.y > canvas.height) {
          gameOver = 1;
        }
        missiles.forEach((missile) => {
          missile.draw(ctx);
          pewpew.play();
          missile.move(canvas.height);
          if (invader.collides(missile)) {
            explosion.play();
            deadMissiles.push(missile);
            deadInvaders.push(invader);
            score++;
          } else if (missile.y + missile.height < 0) {
            deadMissiles.push(missile);
            numMissiles++;
          }
        });
      });
       
    // getting rid of dead invaders and missiles
    invaders.forEach((invader) => {
      deadInvaders.forEach((dead) => {
        if(invader === dead) {
          invaders.splice(invaders.indexOf(invader), 1);
        }
      });
    });
    
    missiles.forEach((missile) => {
      deadMissiles.forEach((dead) => {
        if(missile === dead) {
          missiles.splice(missiles.indexOf(missile), 1);
         }
      });
    });
  }
  if(gameOver === 1) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("GAME OVER!", 165, 300);
  }


  // adding text
  ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Invaders Shot Down: " + score, 10, 20);
    ctx.fillText("Missiles Remaining: " + numMissiles, 10, 40)
  
  window.requestAnimationFrame(draw);
}




draw();