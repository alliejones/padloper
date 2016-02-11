require('codemirror/lib/codemirror.css');
require('./style.css');

var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true,
  value: `repeat(4) {
	move(10);
    rotate(90);
}`
});
var canvas = document.getElementsByClassName('canvas')[0];
var canvasContainer = document.getElementsByClassName('canvas-container')[0];
var size = canvasContainer.getBoundingClientRect();
canvas.width = size.width;
canvas.height = size.height;
var draw = require('./turtle.js');

document.getElementsByClassName('run-button')[0].addEventListener('click', function () {
  draw(canvas, cm.getValue());
});
