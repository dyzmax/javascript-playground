function Point(x, y) {
  this.x = x;
  this.y = y;
}

var moveOperators = {
	up : function (p) {
		return new Point(p.x, p.y - 1);
	},
	down : function (p) {
		return new Point(p.x, p.y + 1);
	},
	left : function (p) {
		return new Point(p.x - 1, p.y);
	},
	right : function (p) {
		return new Point(p.x + 1, p.y);
	}
};

Point.prototype.wrapAroundIfNeeded = function(gridSize) {
	var result = new Point(this.x, this.y);
	if (result.x === -1) {
		result.x = gridSize.x - 1;
	}
	if (result.y === -1) {
		result.y = gridSize.y - 1;
	}
	if (result.x === gridSize.x) {
		result.x = 0;
	}
	if (result.y === gridSize.y) {
		result.y = 0;
	}
	return result;
};
