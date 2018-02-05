function largestOfFour(arr) {
  // You can do this!

  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    newArr.push(Math.max(...arr[i]);
  )
    ;
  }

  return newArr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
