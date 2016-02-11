var parse = require('./parser').parse;
var evl = require('./eval');

module.exports = function (canvas, program) {
  var ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transforms
  ctx.translate(0.5, 0.5); // fixes fuzzy strokes
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var env = {
    ctx: ctx,
    x: 100,
    y: 100,
    direction: 0
  };

  try {
    var ast = parse(program);
    for (var i = 0; i < ast.length; i++) {
      evl(ast[i], env);
    }
  } catch(e) {
    console.log(e.message);
  }
};
