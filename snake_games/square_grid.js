/*function returnSquareGridPublicMembers() {

  var publicMembers = {};*/

  function SquareGrid (gridSize, squareSize, spaceSize, borderSize, container, backgroundColor, turnOnColor, alternativeTurnOnColor) {
    this.gridSize = gridSize;
    this.squareSize = squareSize;
    this.spaceSize = spaceSize;
    this.borderSize = borderSize;
    this.container = container;
    this.backgroundColor = backgroundColor;
    this.turnOnColor = turnOnColor;
    this.alternativeTurnOnColor = alternativeTurnOnColor;
    this.squares = new Array(gridSize.x);

    var gridSizeXinPx = this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * this.gridSize.x;//+ this.spaceSize;
    var gridSizeYinPx = this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * this.gridSize.y;//+ this.spaceSize;
    this.container.setAttribute("style", "position: absolute; top: 10px; left:30px; width:" + gridSizeXinPx + "px; height: " + gridSizeYinPx + "px; border " + this.borderSize + "px solid #000; background-color:" + this.backgroundColor + ";");

    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = new Array(gridSize.y);
      for (var j = 0; j < this.gridSize.y; j++) {
	this.squares[i][j] = new Square(
	    this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * i,
	    this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * j,
	    this.squareSize, this.container, this.backgroundColor, this.turnOnColor, this.alternativeTurnOnColor);
      }
    }
  }

 // publicMembers = SquareGrid;

  SquareGrid.prototype.turnOnAll = function () {
    _.each(squares, function(array) {
      _.each(array, function(square) {
	square.turnOn();
      });
    });
  };

  SquareGrid.prototype.turnOn = function (point, useAlternativeColor) {
    this.squares[point.x][point.y].turnOn(useAlternativeColor);
  };

  SquareGrid.prototype.turnOff = function (point) {
    this.squares[point.x][point.y].turnOff();
  };

  function Square (left, top, size, container, backgroundColor, turnOnColor, alternativeTurnOnColor) {
    this.left = left;
    this.top = top;
    this.size = size;
    this.container = container;
    this.div;
    this.backgroundColor = backgroundColor;
    this.turnOnColor = turnOnColor;
    this.alternativeTurnOnColor = alternativeTurnOnColor;

    this.div = document.createElement('div');
    this.container.appendChild(this.div);
  };

  Square.prototype.turnOn = function(useAlternativeColor) {
    this.changeColor(useAlternativeColor != true ? this.turnOnColor : this.alternativeTurnOnColor);
  };

  Square.prototype.turnOff = function() {
    this.changeColor(this.backgroundColor);
  };

  // TODO - this needs to be made private
  Square.prototype.changeColor = function(color) {
    this.div.setAttribute("style", "background-color:" + color + ";width:" + this.size + "px;height:" + this.size + "px;position: absolute; top: " + this.top + "px; left: " + this.left+ "px;");
  };

/*  return publicMembers;
}*/
