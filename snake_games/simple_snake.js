// TODO zrob dziedziczenie snake z moving pointa. na przyklad do sprawdzania czy glowa weza nie wychodzi za tablice
// na razie jest kompozycja
// TODO dokumentacja
/**
 * Creates instance of Simple Snake
 * @param headLocation location of the snake's head when the game starts
 */
function SimpleSnake (squareGrid, headLocation, numberEatenToWin) {
  // moving point will represent snake's head
  this.movingPoint = new MovingPoint(squareGrid, headLocation);
  this.numberEatenToWin = numberEatenToWin;
  this.snakeParts = [headLocation];
  this.snakePartsMap = {};
  this.snakePartsMap[this.getSnakePartsKey(headLocation)] = headLocation;
  this.movingPoint.squareGrid.turnOn(headLocation);
  this.eatMe = this.randomEatMe();
  this.movingPoint.squareGrid.turnOn(this.eatMe, true);
}

SimpleSnake.prototype.randomEatMe = function() {
  var gridSize = this.movingPoint.squareGrid.gridSize;
  var newEatMeX = Math.floor(Math.random() * gridSize.x);
  var newEatMeY = Math.floor(Math.random() * gridSize.y);
  for (; newEatMeX < gridSize.x; newEatMeX++) {
    for (; newEatMeY < gridSize.y; newEatMeY++) {
      if (! this.snakePartsMap[this.getSnakePartsKey(new Point(newEatMeX, newEatMeY))]) {
	return new Point (newEatMeX, newEatMeY);
      }
    }
  }
  for (newEatMeX = 0; newEatMeX < gridSize.x; newEatMeX++) {
    for (newEatMeY = 0; newEatMeY < gridSize.y; newEatMeY++) {
      if (! this.snakePartsMap[this.getSnakePartsKey(new Point(newEatMeX, newEatMeY))]) {
	return new Point (newEatMeX, newEatMeY);
      }
    }
  }
};

SimpleSnake.prototype.initialDisplay = function() {
  this.movingPoint.initialDisplay();
};

//private
SimpleSnake.prototype.moveTail = function() {
	var newHead = new Point(this.movingPoint.current.x, this.movingPoint.current.y);
	this.snakeParts.unshift(newHead);
	this.snakePartsMap[this.getSnakePartsKey(newHead)] = newHead;
	if (!(this.eatMe.x === this.snakeParts[0].x && this.eatMe.y === this.snakeParts[0].y)) {
		var snakeTail = this.snakeParts[this.snakeParts.length - 1];
		this.movingPoint.squareGrid.turnOff(snakeTail);
		delete this.snakePartsMap[this.getSnakePartsKey(snakeTail)];
		this.snakeParts.pop();
	} else {
		if (this.snakeParts.length === this.numberEatenToWin) {
			throw new YouWonException();
		}
		this.eatMe = this.randomEatMe();
		this.movingPoint.squareGrid.turnOn(this.eatMe, true);
	}
};

// private
SimpleSnake.prototype.getSnakePartsKey = function (part) {
  return part.x + "_" + part.y;
};

SimpleSnake.prototype.move = function(moveOperator) {
	if (this.isMoveInvalidAndNotCausingYouLost(moveOperator)) return;
	var newHead = moveOperator(this.movingPoint.current).wrapAroundIfNeeded(this.movingPoint.squareGrid.gridSize);
	// collision detection
	if (this.snakePartsMap[this.getSnakePartsKey(newHead)]) {
		throw new GameOverException();
	}
	
	this.movingPoint.move(moveOperator, true);
	this.moveTail();
};

/**
 * You can ask the game if the next move chosen by the player will be invalid and will not make you loose the game.
 * If this is the case the UI will treat the key pressed never happened.
 * @param moveOperator
 */
SimpleSnake.prototype.isMoveInvalidAndNotCausingYouLost = function(moveOperator) {
	var newHead = moveOperator(this.movingPoint.current).wrapAroundIfNeeded(this.movingPoint.squareGrid.gridSize);
	// we cannot go backward
	if (this.snakeParts.length > 1) {
		if (newHead.x == this.snakeParts[1].x && newHead.y == this.snakeParts[1].y) {
			return true;
		}
	} else {
		return false;
	}
};

function GameOverException() {};

function YouWonException() {};
