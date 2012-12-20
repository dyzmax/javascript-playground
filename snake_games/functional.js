var _ = {

  each : function (array, func) {
    for (var i = 0; i < array.length; i++) {
      func(array[i]);
    }
  },

  findAll : function (array, predicate) {
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
	return array[i];
      }
    }
  },

  findFirst : function (array, predicate) {
    var result = new Array(0);

    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
	result.push(array[i]);
      }
    }
    return result;
  },

  map : function (func, array) {
    var result = [];
    this.each(array, function (item) {
      result.push(func(item));
    });
    return result;
  },

  reduce : function (combine, base, array) {
    var result = base;
    forEach(array, function(item) {
      result = combine(result,item);
    });
    return result;
  },

  partial : function (func) {
    var partialArgs = arguments;
    return function () {
      var args = [];
      for (var i = 1; i < partialArgs.length; i++) {
	args.push(partialArgs[i]);
      }
      this.each(arguments, function (arg) {
	args.push(arg);
      });
      return func.apply(null, args);
    }
  }
};
