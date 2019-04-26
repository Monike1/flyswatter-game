console.log("Hello from the console!!!!");


var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// drawing a circle
// ctx.beginPath();
// var x = 100; // x coordinate
// var y = 75; // y coordinate
// var radius = 50; // Arc radius
// var startAngle = 0; // Starting point on circle
// var endAngle = Math.PI*2; // End point on circle
// true - draw counterclockwise
// ctx.arc(x, y, radius, startAngle, endAngle, true);
// ctx.moveTo(290,75)
// ctx.arc(250, 75, 40, 0, Math.PI * 2, true);
// ctx.stroke();
// ctx.fill();

// another circle
// ctx.beginPath();
// ctx.arc(200, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'red';
// ctx.stroke();

// Drawing Rectangle
// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
// ctx.fillRect(300, 300, 100, 100);


// Drawing Line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = '#fa34a3';
// ctx.stroke();

// Drawing multiple circles
// for (var i = 0; i < 10; i++) {
//   var radius = 10;
//   var x = Math.random() * (innerWidth - radius * 2) + radius;
//   var y = Math.random() * (innerHeight - radius * 2) + radius;
//   ctx.beginPath();
//   ctx.arc(x, y, 10, 0, Math.PI * 2, false);
//   ctx.strokeStyle = 'orange';
//   ctx.stroke();
// }


// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 10;



var mouse = {
  x: undefined,
  y: undefined
}
// to define x and y coordinates of a mouse 
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

    //interactivity flies - spatter
    // if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
    //   this.radius += 1;
    // } else {
    //   this.radius = 10;
    // }

    this.draw();
  }
  
}



// creating an array of multiple flies
var flyArray = [];

for (var i = 0; i < 1; i++) {
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

// getting a distance between a fly and a crosshairs circle - Pythagorean theorem
function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function animate() {
  requestAnimationFrame(animate);
  // to clear previous frames and show only the current frame:
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < flyArray.length; i++) {
    flyArray[i].move();
    if(getDistance(mouse.x + 28, mouse.y + 27, flyArray[i].x, flyArray[i].y) < 20) {
      flyArray.splice([i], 1);
      console.log(flyArray);
    } 
  }
  new SpatterCircle();
  new SpatterCross();
}

// to move the flies on the screen
animate();