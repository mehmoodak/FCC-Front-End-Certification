function findElement(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) { //passing value to number and check the returned value
      return arr[i];
    }
  }
  return undefined;
}

findElement([1, 2, 3, 4], function (num) {
  return num % 2 === 0;
});
