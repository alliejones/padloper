module.exports = function evl (expr, env) {
  switch (expr.tag) {
    case 'move':
      return move(expr.expr, env);
    case 'rotate':
      return rotate(expr.expr, env);
  }
};


var move = function (amt, env) {
  var dir = degreesToRadians(env.direction);
  var newX = env.x + amt * Math.cos(dir);
  var newY = env.y + amt * Math.sin(dir);
  env.ctx.beginPath();
  env.ctx.moveTo(env.x, env.y);
  env.ctx.lineTo(newX, newY);
  env.ctx.stroke();
  env.x = newX;
  env.y = newY;
};

var rotate = function (pos, env) {
  env.direction = (pos + env.direction) % 360;
};


// helpers

var degreesToRadians = function (deg) {
  return deg * Math.PI/180;
};
