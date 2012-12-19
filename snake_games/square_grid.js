/*function returnSquareGridPublicMembers() {

  var publicMembers = {};*/

  function SquareGrid (gridSizeX, gridSizeY, squareSize, spaceSize, borderSize, container, backgroundColor, turnOnColor) {
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;
    this.squareSize = squareSize;
    this.spaceSize = spaceSize;
    this.borderSize = borderSize;
    this.container = container;
    this.backgroundColor = backgroundColor;
    this.turnOnColor = turnOnColor;
    this.squares = new Array(gridSizeX);

    var gridSizeXinPx = this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * this.gridSizeX;//+ this.spaceSize;
    var gridSizeYinPx = this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * this.gridSizeY;//+ this.spaceSize;
    this.container.setAttribute("style", "position: absolute; top: 10px; left:30px; width:" + gridSizeXinPx + "px; height: " + gridSizeYinPx + "px; border " + this.borderSize + "px solid #000; background-color:" + this.backgroundColor + ";");

    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = new Array(gridSizeY);
      for (var j = 0; j < this.gridSizeY; j++) {
	this.squares[i][j] = new Square(
	    this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * i,
	    this.borderSize + this.spaceSize + (this.spaceSize + this.squareSize) * j,
	    this.squareSize, this.container, this.backgroundColor, this.turnOnColor);
      }
    }
  }

 // publicMembers = SquareGrid;

  SquareGrid.prototype.turnOnAll = function () {
    for (var i = 0; i < this.gridSizeX; i++) {
      for (var j = 0; j < this.gridSizeY; j++) {
	this.squares[i][j].turnOn();
      }
    }
  };

  SquareGrid.prototype.turnOn = function (x, y) {
    this.squares[x][y].turnOn();
  };

  SquareGrid.prototype.turnOff = function (x, y) {
    this.squares[x][y].turnOff();
  };

  function Square (left, top, size, container, backgroundColor, turnOnColor) {
    this.left = left;
    this.top = top;
    this.size = size;
    this.container = container;
    this.div;
    this.backgroundColor = backgroundColor;
    this.turnOnColor = turnOnColor;

    this.div = document.createElement('div');
    this.container.appendChild(this.div);
  };

  Square.prototype.turnOn = function() {
    this.changeColor(this.turnOnColor);
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
