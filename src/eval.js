module.exports = function evl (expr, env, cont) {
  if (typeof expr === 'number')
    return thunk(cont, expr);

  if (Array.isArray(expr)) {
    return (function loop (env, i) {
      if (i < expr.length - 1) {
        return thunk(evl, expr[i], env, function () { return loop(env, i + 1); });
      } else {
        return thunk(evl, expr[i], env, cont);
      }
    })(env, 0);
  }

  switch (expr.tag) {
      case '+':
        return thunk(evl, expr.left, env, function (v) {
          return thunk(evl, expr.right, env, function (v2) {
            return thunk(cont, v + v2);
          });
        });
      case '-':
        return thunk(evl, expr.left, env, function (v) {
          return thunk(evl, expr.right, env, function (v2) {
            return thunk(cont, v - v2);
          });
        });
      case '*':
        return thunk(evl, expr.left, env, function (v) {
          return thunk(evl, expr.right, env, function (v2) {
            return thunk(cont, v * v2);
          });
        });
      case '/':
        return thunk(evl, expr.left, env, function (v) {
          return thunk(evl, expr.right, env, function (v2) {
            return thunk(cont, v / v2);
          });
        });
      case 'call':
        // for now only one arg ...
        return thunk(evl, expr.args[0], env, function (v) {
          var c = cont;
          return thunk(funcs[expr.name], v, env, c);
        });
  }
};

var thunk = function (func, ...args) {
  return { tag: "thunk", func, args };
};

var funcs = {
  move: function (amt, env, cont) {
    var dir = degreesToRadians(env.direction);
    var newX = env.x + amt * Math.cos(dir);
    var newY = env.y + amt * Math.sin(dir);
    env.paths.push({
      start: { x: env.x, y: env.y },
      end: { x: newX, y: newY }
    });
    env.x = newX;
    env.y = newY;
    return thunk(cont, env);
  },

  rotate: function (pos, env, cont) {
    env.direction = (pos + env.direction) % 360;
    return thunk(cont, env);
  }
};


// helpers

var degreesToRadians = function (deg) {
  return deg * Math.PI/180;
};
