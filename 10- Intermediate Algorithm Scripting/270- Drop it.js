function dropElements(arr, func) {
  // Drop them elements.

  //Imp -> If element is dropped more than one then the elements
  //       will be included in the array.

  var newArr = [];
  var droppedArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) { // checking whether second argument's function return true or not
      newArr.push(arr[i]);
    } else {
      if (droppedArr.indexOf(arr[i]) >= 0) { //Check if elemetn is already dropped then add it to the array
        newArr.push(arr[i]);
      } else {
        droppedArr.push(arr[i]);
      }
    }
  }

  return newArr;
}

dropElements([1, 2, 3], function (n) {
  return n < 3;
});
