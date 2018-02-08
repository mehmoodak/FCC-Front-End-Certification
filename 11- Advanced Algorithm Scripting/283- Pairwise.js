function pairwise(arr, arg) {

  var sum = 0; // For saving sum of indexes
  var pairedNumbers = []; // For saving indexes which are already calculated on sum


  //For checking whether a given indexes matches with any of the pair
  function isPairedMatch(first, second) {
    for (var i = 0; i < pairedNumbers.length; i++) {

      //Match each of given pair value to the existing pairs
      if (pairedNumbers[i].indexOf(first) >= 0 || pairedNumbers[i].indexOf(second) >= 0) {
        return true;
      }
    }
    return false;
  }


  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      // If pairs are not unique and equal to second argument
      if (i !== j && (arr[i] + arr[j] === arg)) {

        //If pairs are not matched with already calculated pairs
        if (!isPairedMatch(i, j)) {
          pairedNumbers.push([i, j]); //storing pairs for checking further values
          sum += i + j; // calculating and saving sume
        }
      }
    }
  }

  return sum;
}

console.log(pairwise([0, 0, 0, 0, 1, 1], 1));