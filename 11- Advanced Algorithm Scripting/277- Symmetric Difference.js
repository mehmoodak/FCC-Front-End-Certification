//Function that gives symmetric elements between two arrays.
function getSymmetric(arr1, arr2) { //arrays are passed on by one with reducer

  var newArr1 = arr1.filter(function (value, index) {
    // Return value if the other array has not that value and if there is no duplicate
    // Index of returns just first index which it finds
    if (arr2.indexOf(value) < 0 && index == arr1.indexOf(value))
      return value;
  });

  var newArr2 = arr2.filter(function (value, index) {
    // Return value if the other array has not that value and if there is no duplicate
    // Index of returns just first index which it finds
    if (arr1.indexOf(value) < 0 && index == arr2.indexOf(value))
      return value;
  });

  return newArr1.concat(newArr2);

}

function sym(args) {

  args = Array.prototype.slice.call(arguments);
  // get symmetric elements by using reduce function
  args = args.reduce(getSymmetric);


  return args;
}

sym([1, 2, 3], [5, 2, 1, 4]);
