var { degreesToRadians } = require('./util');

class TurtleCanvas {
  constructor (canvasEl, canvasContainerEl) {
    this.ctx = canvasEl.getContext('2d');
  }

  draw (turtle, paths) {
    this.clear();
    paths.forEach(p => this.drawPath(p));
    this.drawTurtle(turtle);
  }

  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transforms
    this.ctx.translate(0.5, 0.5); // fixes fuzzy strokes
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawPath (path) {
    this.ctx.beginPath();
    this.ctx.moveTo(path.start.x, path.start.y);
    this.ctx.lineTo(path.end.x, path.end.y);
    this.ctx.stroke();
  }

  drawTurtle(turtle) {
    this.ctx.save();
    this.ctx.translate(turtle.x, turtle.y);
    this.ctx.rotate(degreesToRadians(turtle.direction));
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-10, -5);
    this.ctx.lineTo(-10, 5);
    this.ctx.fill();
    this.ctx.restore();
  }

  fitToContainer (containerEl) {
    var size = containerEl.getBoundingClientRect();
    this.ctx.canvas.width = size.width;
    this.ctx.canvas.height = size.height;
  }
}

module.exports = TurtleCanvas;
