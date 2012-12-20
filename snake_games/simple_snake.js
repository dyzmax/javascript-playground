// TODO zrob dziedziczenie snake z moving pointa. na przyklad do sprawdzania czy glowa weza nie wychodzi za tablice
// na razie jest kompozycja
function SimpleSnake (squareGrid, headLocation) {
  // moving point will represent snake's head
  this.movingPoint = new MovingPoint(squareGrid, headLocation);
  this.snakeParts = [headLocation];
  this.snakePartsMap = {};
  this.snakePartsMap[this.getSnakePartsKey(headLocation)] = headLocation;
  this.movingPoint.squareGrid.turnOn(headLocation);
  // TODO random that
  this.eatMe = this.randomEatMe();
  this.movingPoint.squareGrid.turnOn(this.eatMe, true);
  console.log(this.snakePartsMap);
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
    var key = this.getSnakePartsKey(snakeTail);
    delete this.snakePartsMap[this.getSnakePartsKey(snakeTail)];
    this.snakeParts.pop();
  } else {
    this.eatMe = this.randomEatMe();
    this.movingPoint.squareGrid.turnOn(this.eatMe, true);
  }
  console.log(this.snakePartsMap);
};

// private
SimpleSnake.prototype.getSnakePartsKey = function (part) {
  return part.x + "_" + part.y;
}

SimpleSnake.prototype.left = function() {
  if (this.movingPoint.left(true)) return;
  this.moveTail();
};
SimpleSnake.prototype.right = function() {
  if (this.movingPoint.right(true)) return;
  this.moveTail();
};
SimpleSnake.prototype.up = function() {
  if (this.movingPoint.up(true)) return;
  this.moveTail();
};
SimpleSnake.prototype.down = function() {
  if (this.movingPoint.down(true)) return;
  this.moveTail();
};

