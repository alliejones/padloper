var { degreesToRadians } = require('./util');

module.exports = function evl (expr, env, cont) {
  if (typeof expr === 'number')
    return thunk(cont, expr);

  if (Array.isArray(expr)) {
    return (function evalList (env, i) {
      if (i < expr.length - 1) {
        return thunk(evl, expr[i], env, function () { return evalList(env, i + 1); });
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
      return thunk(funcs[expr.name], v, env, cont);
    });
  case 'repeat':
    return (function repeat (env, i) {
      if (i < expr.count) {
        return thunk(evl, expr.body, env, function () { return repeat(env, i + 1); });
      } else {
        return thunk(cont, 0, env, cont);
      }
    })(env, 0);
  }
};

var thunk = function (func, ...args) {
  return { tag: "thunk", func, args, type: "normal" };
};

var drawThunk = function (func, ...args) {
  return { tag: "thunk", func, args, type: "draw" };
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
    return drawThunk(cont, env);
  },

  rotate: function (pos, env, cont) {
    env.direction = (pos + env.direction) % 360;
    return drawThunk(cont, env);
  }
};

