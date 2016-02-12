require('codemirror/lib/codemirror.css');
require('./style.css');


var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true,
  value: `move(10);
rotate(90);
move(10);
rotate(90);
move(10);
rotate(90);
move(10);
rotate(90);`
});


var TurtleCanvas = require('./canvas');
var canvas = new TurtleCanvas(document.getElementsByClassName('canvas')[0]);
canvas.fitToContainer(document.getElementsByClassName('canvas-container')[0]);

document.getElementsByClassName('run-button')[0].addEventListener('click', function () {
  run(canvas, cm.getValue());
});


var parse = require('./parser').parse;
var evl = require('./eval');

var run = function (canvas, program) {
  var env = {
    x: 100,
    y: 100,
    direction: 0,
    paths: []
  };

  try {
    var ast = parse(program);
    for (var i = 0; i < ast.length; i++) {
      evl(ast[i], env);
    }
    canvas.draw(env.paths);
  } catch(e) {
    console.log(e.message);
  }
};

run(canvas, cm.getValue());
