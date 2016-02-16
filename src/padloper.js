require('codemirror/lib/codemirror.css');
require('./style.css');


var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true,
  value: `repeat(4) {
  move(50);
  rotate(90);
}`
});


var TurtleCanvas = require('./canvas');
var canvas = new TurtleCanvas(document.getElementsByClassName('canvas')[0]);
canvas.fitToContainer(document.getElementsByClassName('canvas-container')[0]);

document.getElementsByClassName('run-button')[0].addEventListener('click', function () {
  run(canvas, cm.getValue());
});

var state = null, env = {};
document.getElementsByClassName('step-button')[0].addEventListener('click', function () {
  if (!state) state = firstStep(canvas, cm.getValue());
  step(state);
  canvas.draw({ x: env.x, y: env.y, direction: env.direction }, env.paths);
});

var parse = require('./parser').parse;
var evl = require('./eval');

var firstStep = function (canvas, program) {
  var ast = parse(program);
  env = {
    x: 100,
    y: 100,
    direction: 0,
    paths: []
  };

  return {
    canvas: canvas,
    data: evl(ast, env, v => { return { tag: "value", value: v }}),
    done: false
  };
};

var step = function (state) {
  if (state.done) return;

  while ((state.data.tag !== "thunk") ||
         (state.data.tag === "thunk" && state.data.type !== "draw")) {

    if (state.data.tag === "value") {
      state.data = state.data.val;
      state.done = true;
    } else if (state.data.tag === "thunk") {
      state.data = state.data.func.apply(null, state.data.args);
    } else {
      throw new Error("Bad thunk");
    }

    if (state.done) return;
  }

  if (state.data.tag === "thunk" && state.data.type === "draw") {
    state.data = state.data.func.apply(null, state.data.args);
  }
};

var run = function (canvas, program) {
  var env = {
    x: 100,
    y: 100,
    direction: 0,
    paths: []
  };

  try {
    var ast = parse(program);
    console.log(ast);
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
