console.log("Hello from the console!!!!");


var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var startBtn = document.getElementsByClassName('start-btn')[0];
var gameTitle = document.getElementsByClassName('game-title')[0];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var score = 0; 
var gameOver = false;

var mouse = {
  x: undefined,
  y: undefined
}

startBtn.addEventListener('click', function() {
  score = 0;
  gameOver = false;
  setFliesOnScreen();
  animate();
  startBtn.style.display = 'none';
  gameTitle.style.display = 'none';
});

// to remove flies from the screen and update score; check if game is over
window.addEventListener('click', function(event) { 
  
  for (var i = 0; i < flyArray.length; i++) {
    if(getDistance(mouse.x + 28, mouse.y + 27, flyArray[i].x, flyArray[i].y) < 30 && getDistance(mouse.x + 28, mouse.y + 27, flyArray[i].x, flyArray[i].y) > -30) {
      flyArray.splice([i], 1);
      score += 1;
    } 
    if (score === 5) {
      gameOver = true;
      console.log('Game over!!!!');

      drawGameOverPage();
    }
  }
  
  
});
// to get mouse x and y coordinates
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});



//creating crosshairs - SpatterCircle will collide with the flies
function SpatterCircle() {
  ctx.beginPath();
  ctx.arc(mouse.x + 28, mouse.y + 27, 15, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

// to draw a crosshairs inside SpatterCircle - for visual effect
function SpatterCross() {
  ctx.beginPath();
  ctx.moveTo(mouse.x + 14, mouse.y + 27);
  ctx.lineTo(mouse.x + 43, mouse.y + 28);
  ctx.strokeStyle = 'red';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mouse.x + 28, mouse.y + 12);
  ctx.lineTo(mouse.x + 28, mouse.y + 42);
  ctx.strokeStyle = 'red';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(mouse.x + 28, mouse.y + 27, 5, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'red';
  ctx.stroke();
}


// creating a Fly constructor function
function Fly(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  // draw a fly - a circle
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#333';
    ctx.fill();
  }
  // to update position of the fly increasing or decreasing x and y 
  this.move = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
  // this.stopMove = function() {
    
  //   this.x += 0;
  //   this.y += 0;
  //   this.draw();
  // }
}

// creating an array of multiple flies
var flyArray = [];
// to set flies on screen after clicking start button
function setFliesOnScreen(e) {
  for (var i = 0; i < 5; i++) {
    // dx - x velocity, increase the speed on x-axis 
    //dy - y velocity, increase the speed on y-axis
      var radius = 10;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 4;
      var dy = (Math.random() - 0.5) * 4;
      
      flyArray.push(new Fly(x, y, dx, dy, radius)); 
      flyArray[i].draw();
    }
}


// getting a distance between a fly and a crosshairs circle - Pythagorean theorem
function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//to print Score: ... on the screen
function text(txt, fnt, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = fnt;
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText(txt, x, y);
}

function textGameOver(txt, fnt, x, y) {
  ctx.fillStyle = 'white';
  ctx.font = fnt;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(txt, x, y);
}

function drawGameOverPage() {
 
    ctx.beginPath();
    ctx.fillStyle = 'darkgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    textGameOver('GAME OVER', '75px Arial', canvas.width/2 - 10, canvas.height/4);
    textGameOver(`Score: ${score}`, '30px Arial', canvas.width/2 - 10, canvas.height/4 + 75);
    startBtn.style.display = 'inline-block';
  
}

function animate() {
  requestAnimationFrame(animate);
  // to clear previous frames and show only the current frame:
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < flyArray.length; i++) {
    flyArray[i].move(); 
  }
  
  new SpatterCircle();
  new SpatterCross();
  text("Score: " + score, '30px Arial', 50, 50, 'darkgray');
  if (gameOver === true) {
    drawGameOverPage();
  }
}