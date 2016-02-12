module.exports = function evl (expr, env) {
  if (typeof expr === 'number') return expr;

  if (Array.isArray(expr)) {
    let val;
    for (let i = 0; i < expr.length; i++) {
      val = evl(expr[i], env);
    }
    return val;
  }

  switch (expr.tag) {
      case '+':
        return evl(expr.left, env) + evl(expr.right, env);
      case '-':
        return evl(expr.left, env) - evl(expr.right, env);
      case '*':
        return evl(expr.left, env) * evl(expr.right, env);
      case '/':
        return evl(expr.left, env) / evl(expr.right, env);
      case 'call':
        let func = funcs[expr.name];
        if (!func)
          throw new Error(`Function ${expr.name} not found.`)
        let evaledArgs = [];
        for (let i = 0; i < expr.args.length; i++) {
            evaledArgs.push(evl(expr.args[i], env));
        }
        evaledArgs.push(env);
        return func.apply(null, evaledArgs);
  }
};

var funcs = {
  move: function (amt, env) {
    var dir = degreesToRadians(env.direction);
    var newX = env.x + amt * Math.cos(dir);
    var newY = env.y + amt * Math.sin(dir);
    env.paths.push({
      start: { x: env.x, y: env.y },
      end: { x: newX, y: newY }
    });
    env.x = newX;
    env.y = newY;
  },

  rotate: function (pos, env) {
    env.direction = (pos + env.direction) % 360;
  }
};


// helpers

var degreesToRadians = function (deg) {
  return deg * Math.PI/180;
};
