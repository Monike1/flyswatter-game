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
    if (score === 30) {
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
  ctx.strokeStyle = '#D04D00';
  ctx.stroke();
}

// to draw a crosshairs inside SpatterCircle - for visual effect
function SpatterCross() {
  ctx.beginPath();
  ctx.moveTo(mouse.x + 14, mouse.y + 27);
  ctx.lineTo(mouse.x + 43, mouse.y + 28);
  ctx.strokeStyle = '#D04D00';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mouse.x + 28, mouse.y + 12);
  ctx.lineTo(mouse.x + 28, mouse.y + 42);
  ctx.strokeStyle = '#D04D00';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(mouse.x + 28, mouse.y + 27, 5, 0, Math.PI * 2, false);
  ctx.strokeStyle = '#D04D00';
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
    ctx.fillStyle = '#252E39';
    ctx.fill();
    // fly eyes ------------------------------
    // first eye
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y, this.radius / 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FEB58B';
    ctx.fill();
    //middle of the eye
    ctx.beginPath();
    ctx.arc(this.x - 6, this.y - 3, this.radius / 8, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FEFEFE';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x - 4, this.y - 1, this.radius / 8, 0, Math.PI * 2, false);
    ctx.fillStyle = '#252E39';
    ctx.fill();
    // second eye
    ctx.beginPath();
    ctx.arc(this.x + 5, this.y, this.radius / 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FEB58B';
    ctx.fill();
    //middle of the eye
    ctx.beginPath();
    ctx.arc(this.x + 4, this.y - 3, this.radius / 8, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FEFEFE';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + 5, this.y - 1, this.radius / 8, 0, Math.PI * 2, false);
    ctx.fillStyle = '#252E39';
    ctx.fill();
    // wings
    //first wing
    ctx.beginPath();
    ctx.arc(this.x - 14, this.y - 6, this.radius / 1.5, 0, Math.PI, true);
    ctx.strokeStyle = '#A29BAD';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x - 20, this.y - 6);
    ctx.lineTo(this.x - 6, this.y - 4);
    ctx.strokeStyle = '#A29BAD';
    ctx.stroke();
    //second wing
    ctx.beginPath();
    ctx.arc(this.x + 14, this.y - 6, this.radius / 1.5, 0, Math.PI, true);
    ctx.strokeStyle = '#A29BAD';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 20, this.y - 6);
    ctx.lineTo(this.x + 6, this.y - 4);
    ctx.strokeStyle = '#A29BAD';
    ctx.stroke();
  }
  
  // to update position of the fly increasing or decreasing x and y 
  this.move = function() {
    if(this.x + (this.radius * 2) > innerWidth || this.x - (this.radius * 2) < 0) {
      this.dx = -this.dx;
    }
    if (this.y + (this.radius * 2) > innerHeight || this.y - (this.radius * 4) < 0) {
      this.dy = -this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// creating an array of multiple flies
var flyArray = [];
// to set flies on screen after clicking start button
function setFliesOnScreen(e) {
  for (var i = 0; i < 30; i++) {
    // dx - x velocity, increase the speed on x-axis 
    //dy - y velocity, increase the speed on y-axis
      var radius = 10;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 10;
      var dy = (Math.random() - 0.5) * 10;
      
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
  ctx.fillStyle = '#A29BAD';
  ctx.font = fnt;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(txt, x, y);
}

function drawGameOverPage() {
 
    ctx.beginPath();
    ctx.fillStyle = '#DAD7DE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    textGameOver('GAME OVER', '75px Arial', canvas.width/2, canvas.height/3);
    textGameOver(`Score: ${score}`, '30px Arial', canvas.width/2, canvas.height/3 + 75);
    startBtn.style.display = 'inline-block';
  
}



function animate() {
  requestAnimationFrame(animate);
  // to clear previous frames and show only the current frame:
  ctx.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < flyArray.length; i++) {
      flyArray[i].move(); 
    }
  
    function stopFly() {
      for (var i = 0; i < flyArray.length; i++) {
        if (flyArray.length % 2 !== 0) {
          if ((flyArray[i].dx > 4 || flyArray[i].dy > 4) || (flyArray[i].dx < -4 || flyArray[i].dy < -4)) {
            flyArray[i].dx = 0;
            flyArray[i].dy = 0;
          } 
        } else if (flyArray.length % 2 === 0) {
          if (flyArray[i].dx === 0 && flyArray[i].dy === 0) {
            flyArray[i].dx = (Math.random() - 0.5) * 16;
            flyArray[i].dy = (Math.random() - 0.5) * 16;
          } 
        }
      }
    }
  stopFly();
  
  new SpatterCircle();
  new SpatterCross();
  text("Score: " + score, '30px Arial', 50, 50, '#A29BAD');
  if (gameOver === true) {
    drawGameOverPage();
  }
}