var parse = require('../demo/parser').parse;

module.exports = function (canvas, program) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var turtle = new Turtle(canvas);

  try {
    evl(turtle, parse(program));
  } catch(e) {
    console.log(e.message);
  }
};

var evl = function evl (turtle, expr) {
  if (Array.isArray(expr)) {
    for (var i = 0; i < expr.length; i++) {
      evl(turtle, expr[i]);
    }
  } else {
    switch (expr.tag) {
      case 'move':
        turtle.move(expr.expr);
        break;
      case 'rotate':
        turtle.rotate(expr.expr);
        break;
      case 'repeat':
        for (var i = 0; i < expr.expr; i++) {
          evl(turtle, expr.body);
        }
    }
  }
};

var degreesToRadians = function (deg) {
    return deg * Math.PI/180;
};

class Turtle {
  constructor(canvas) {
    this.x = 100;
    this.y = 100;
    this.direction = 0;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  move(amt) {
    var dir = degreesToRadians(this.direction);
    var newX = this.x + amt * Math.cos(dir);
    var newY = this.y + amt * Math.sin(dir);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();
    this.x = newX;
    this.y = newY;
  }

  rotate(pos) {
    this.direction = (pos + this.direction) % 360;
  }
}
