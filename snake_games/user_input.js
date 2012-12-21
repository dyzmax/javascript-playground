function UserInput(game) {
	this.game = game;
	this.lastPressedOperator = moveOperators.right;
	this.interval = null;
	this.arrowsToMoveOperators = {
		'37' : moveOperators.left,
		'38' : moveOperators.up,
		'39' : moveOperators.right,
		'40' : moveOperators.down
	};
}

UserInput.prototype.initialize = function() {
	this.createKeyboardEvenListeners();
	this.createInterval();
};

// TODO private
UserInput.prototype.createKeyboardEvenListeners = function() {
	// can this be done better?
	var realThis = this;

	var onKeyDown = function(e) {
		e = e || window.event;

		var moveOperator = realThis.arrowsToMoveOperators[e.keyCode];

		// not an arrow key pressed
		if (!moveOperator) {
			return;
		}
		
		if (realThis.game.isMoveInvalidAndNotCausingYouLost(moveOperator)) {
			return;
		}

		realThis.lastPressedOperator = moveOperator;
	};

	// bad duplication, but this is browser specific so i do not care - in real
	// life I would use some library
	if (window.addEventListener) {
		window.addEventListener("keydown", onKeyDown, true);
	} else if (window.attachEvent) { // IE
		alert(window);
		window.attachEvent("onkeydown", onKeyDown);
	} else {
		document.addEventListener("keydown", onKeyDown, true);
	}

};

// TODO private
UserInput.prototype.createInterval = function() {
	// TODO can this "realThis" be changed to something more tasty?
	var realThis = this;
	this.interval = window.setInterval(function() {
		try {
			realThis.game.move(realThis.lastPressedOperator);
		} catch (e) {
			if (e instanceof GameOverException) {
				alert("you lost!");
				window.clearInterval(realThis.interval);
			} else if (e instanceof YouWonException) {
				alert("you won!");
				window.clearInterval(realThis.interval);
			} else {
				throw e;
			}
		}
	}, 100);
};
