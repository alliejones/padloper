var debounce = require('debounce');
var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true,
  value: `repeat(4) {
	move(10);
    rotate(90);
}`
});
var canvas = document.getElementsByClassName('canvas')[0];
var draw = require('./turtle.js');

document.getElementsByClassName('run-button')[0].addEventListener('click', function () {
  draw(canvas, cm.getValue());
});
