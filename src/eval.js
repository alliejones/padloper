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
