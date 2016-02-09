var debounce = require('debounce');
var CodeMirror = require('codemirror');
var cm = CodeMirror(document.getElementsByClassName('editor')[0], {
  lineNumbers: true
});

var parse = require('../build/parser').parse;

cm.on('change', debounce(function(instance) {
  try {
    console.log(parse(instance.getValue()));
  } catch(e) {
    console.log(e.message);
  }
}, 500));
