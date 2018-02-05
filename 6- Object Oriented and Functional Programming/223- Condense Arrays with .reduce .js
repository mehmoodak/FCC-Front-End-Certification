var array = [4, 5, 6, 7, 8];
var singleVal = 0;

// Only change code below this line.

singleVal = array.reduce(
    function (acc, val) {
      return acc + val;
    });
