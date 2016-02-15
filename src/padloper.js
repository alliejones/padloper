require('codemirror/lib/codemirror.css');
require('./style.css');


var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true,
  value: `move(5 * 10);
rotate(90);
move(50);
rotate(90);
move(100 / 2);
rotate(90);
move(50);`
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
    var start = evl(ast, env, v => { return { tag: "value", value: v }});

    evalThunk(start);
    canvas.draw(env.paths);
  } catch(e) {
    console.log(e.message);
  }
};

var evalThunk = function (thk) {
  while (true) {
    if (thk.tag === "value") {
      return thk.value;
    } else if (thk.tag === "thunk") {
      thk = thk.func.apply(null, thk.args);
    }
  }
};

run(canvas, cm.getValue());
