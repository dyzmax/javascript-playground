// TODO zrob dziedziczenie snake z moving pointa. na przyklad do sprawdzania czy glowa weza nie wychodzi za tablice
function MovingPoint (squareGrid, current) {
  this.squareGrid = squareGrid;
  this.current = current;
}

MovingPoint.prototype.initialDisplay = function() {
  this.squareGrid.turnOn(this.current);
};

//TODO private
MovingPoint.prototype.movePrivate = function(current, moveOperator, duplicatePoint) {
	var newCurrent = moveOperator(current).wrapAroundIfNeeded(this.squareGrid.gridSize);
	if (duplicatePoint !== true) {
		this.squareGrid.turnOff(this.current);
	}
	this.current = newCurrent;
	this.squareGrid.turnOn(this.current);
};

MovingPoint.prototype.move = function(moveOperator, duplicatePoint) {
	this.movePrivate(this.current, moveOperator, duplicatePoint);
};

MovingPoint.prototype.isMoveInvalidAndNotCausingYouLost = function(moveOperator) {
	return false;
};


// TODO backend w node.js
