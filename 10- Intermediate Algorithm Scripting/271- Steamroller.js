// This function propagate recursively until it finds the element
// which is not array and push it into the array and return that
// array. In the end of recursive function our array turned into
// flattend array
function getFattenedArray(arr, newArr) {

  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) { // call function if array
      newArr = getFattenedArray(arr[i], newArr);
    } else {
      newArr.push(arr[i]); //push the array if element is not array
    }
  }

  return newArr; //return the array
}

function steamrollArray(arr) {
  // I'm a steamroller, baby

  var newArr = [];
  arr = getFattenedArray(arr, newArr); //Recursive Function to get flattened array

  return arr;
}


steamrollArray([[["a"]], [["b"]]]);
