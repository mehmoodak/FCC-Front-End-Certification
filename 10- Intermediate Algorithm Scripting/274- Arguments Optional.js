function addTogether() {

  if (arguments[0] && arguments[1] && typeof(arguments[0]) === 'number' && typeof(arguments[1]) === 'number') { //if both arguments exist and are numbers
    return arguments[0] + arguments[1];
  } else if (arguments[0] && typeof(arguments[0]) === 'number' && !arguments[1]) { // if one argument exist and a number then return closure

    var x = arguments[0]; // save that argument to pass into Closure
    return function (arg) {
      if (typeof(arg) === 'number') { //if arg of closure is a number then sum it
        return arg + x;
      } else {
        return undefined; //return of closure
      }
    };

  } else {
    return undefined; //return of function
  }

}

addTogether(2, 3);
