//Get Minimum and Maximum helpful for divsible loop
function getMinMax(arr) {
  if (arr[0] > arr[1]) {
    min = arr[1];
    max = arr[0];
  } else {
    min = arr[0];
    max = arr[1];
  }

  return {
    'min': min,
    'max': max
  };
}


//check if provided num is completely divisble between the min max and including both
function isCompletelyDivisible(min, max, num) {
  for (var j = min; j <= max; j++) {
    if (num % j !== 0) //if number is not divisible at any stage return false
      return false;
  }
  return true;
}

function getSmallestMultiple(min, max) {

  for (var i = max; true; i++) {
//
    var isDivisible = isCompletelyDivisible(min, max, i); //check wether the number is divisible or not

    if (isDivisible) {
      return i;
    } else {
      continue;
    }
  }

}

function smallestCommons(arr) {

  var minMax = getMinMax(arr);
  var num = getSmallestMultiple(minMax.min, minMax.max);


  return num;
}


console.log(smallestCommons([23, 18]));