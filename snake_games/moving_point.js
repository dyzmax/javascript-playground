// TODO zrob dziedziczenie snake z moving pointa. na przyklad do sprawdzania czy glowa weza nie wychodzi za tablice
function MovingPoint (squareGrid, current) {
  this.squareGrid = squareGrid;
  this.current = current;
}

MovingPoint.prototype.initialDisplay = function() {
  grid.turnOn(this.current);
};

//TODO private
MovingPoint.prototype.movePoint = function(newCurrent, duplicatePoint) {
  if (duplicatePoint !== true) {
    grid.turnOff(this.current);
  }
  this.current = newCurrent;
  grid.turnOn(this.current);
};

MovingPoint.prototype.left = function(duplicatePoint) {
  if (this.leftInvalid()) return true;
  this.movePoint(new Point(this.current.x - 1, this.current.y), duplicatePoint);
};
MovingPoint.prototype.right = function(duplicatePoint) {
  if (this.rightInvalid()) return true;
  this.movePoint(new Point(this.current.x + 1, this.current.y), duplicatePoint);
};
MovingPoint.prototype.up = function(duplicatePoint) {
  if (this.upInvalid()) return true;
  this.movePoint(new Point(this.current.x, this.current.y - 1), duplicatePoint);
};
MovingPoint.prototype.down = function(duplicatePoint) {
  if (this.downInvalid()) return true;
  this.movePoint(new Point(this.current.x, this.current.y + 1), duplicatePoint);
};

//protected, returns true if move invalid
MovingPoint.prototype.leftInvalid = function() {
  return this.current.x === 0 ? true : false;
};
//protected, returns true if move invalid
MovingPoint.prototype.rightInvalid = function() {
  return this.current.x === this.squareGrid.gridSize.x - 1 ? true : false;
};
//protected, returns true if move invalid
MovingPoint.prototype.upInvalid = function() {
  return this.current.y === 0 ? true : false;
};
//protected, returns true if move invalid
MovingPoint.prototype.downInvalid = function() {
  return this.current.y === this.squareGrid.gridSize.y - 1 ? true : false;
};

