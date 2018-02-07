function sumAll(arr) {

  var total = 0;
  arr.sort();

  var min = arr.reduce(function (a, b) {
    return Math.min(a, b);
  });

  var max = arr.reduce(function (a, b) {
    return Math.max(a, b);
  });

  for (var i = min; i <= max; i++)
    total += i;

  return total;
}

sumAll([1, 4]);
