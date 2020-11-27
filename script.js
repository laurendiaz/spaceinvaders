import Invader from "./model/Invader.js";
import Missile from "./model/Missile.js";
import Tank from "./model/Tank.js";
import Heart from "./model/Heart.js";

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

// space invaders title
let title = new Image(7, 7);
title.src = './assets/spaceinvaderstitle.png';
let gameOverTitle = new Image(7,7);
gameOverTitle.src = './assets/gameover.png';
let instructions = new Image(7,7);
instructions.src = './assets/instructions.png';
let pressToStart = new Image(7,7);
pressToStart.src = './assets/presstostart.png';

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
const tank = new Tank(canvas.width/2, canvas.height - 70, 70, 70, "./assets/tank.png");


// creating missiles
let start = false;
let missiles = [];
let numMissiles = 10;
document.body.onkeyup = function(e) {
  start = true;
  if(e.keyCode === 32 && numMissiles > 0) {
    let missile = new Missile(tank.x + 7, tank.y, 60, 80, "./assets/missile.png");
    missiles.push(missile);
    console.log(missiles);
    numMissiles--;
    //numMissiles += missile.updateNumMissiles;
    console.log(numMissiles);
  }
}

document.body.onkeydown = function(e) {
  start = true;
}

let livesSet = false;

// creating invaders
let invaders = [];
function invade() {
  if(start === true) {
    backgroundMusic.play();
    let coward = Math.floor(Math.round(Math.random()));
    let speed = Math.random()*5;
    invaders.push(new Invader((canvas.width - 10)*Math.random(), canvas.height-600, 50, 25, "./assets/invader.png", coward, speed));
    livesSet = false;
  }
}
(function loop() {
  var rand = Math.round(Math.random() * (5000 - 700));
  setTimeout(function() {
          invade();
          loop();  
  }, rand);
}());

let hearts = [];
function live() {
  hearts.push(new Heart(10, 500, 50, 30, "./assets/heart.png"));
  hearts.push(new Heart(50, 500, 50, 30, "./assets/heart.png"));
  hearts.push(new Heart(90, 500, 50, 30, "./assets/heart.png"));
}
live();



let lives = 3;

let score = 0;
let deadInvaders = [];
let deadMissiles = []; 

// draw (on) canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  if(start === false) {
    ctx.drawImage(instructions, 40, 150, 400, 200);
    ctx.font = "13px Arial";
    ctx.fillText("You get three lives.", 190, 250);
    ctx.fillText("Press the space bar to launch missiles and the arrow bars to move side to side.", 10, 275);
    ctx.fillText("Your missiles will replenish once they are off the screen or have struck an invader.", 7, 300)
    ctx.fillText("You lose a life if an invader makes it to the bottom of the screen.", 65, 325)
    ctx.fillText("Happy Space Invader Hunting :)", 150, 350);
    ctx.drawImage(pressToStart, 105, 300, 300, 200);

  }
  if(lives !== 0) {
    
    numMissiles = 10 - missiles.length;
    
    tank.move(canvas.width);
    hearts.forEach((heart) => {
      heart.draw(ctx);

    })
      invaders.forEach((invader) => {
        invader.draw(ctx);
        invader.attack(Math.floor(Math.random() * (1 - (-1) + 1)) + (-1));
        if (invader.y > canvas.height && !livesSet) {
          console.log(lives);
          lives--;
          hearts.pop();
          invaders.splice(invaders.indexOf(invader), 1);
          livesSet = true;
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
  if(lives === 0) {
    ctx.drawImage(gameOverTitle, 40, 200, 400, 200);
  }


  // adding other elements
  ctx.drawImage(title, 40, -30, 400, 200);
  ctx.font = "16px Arial";
    ctx.fillStyle = "#FFDF00";
    ctx.fillText("Invaders Shot Down: " + score, 10, 550);
    ctx.fillText("Missiles Remaining: " + numMissiles, 10, 580)
  
  window.requestAnimationFrame(draw);
}




draw();