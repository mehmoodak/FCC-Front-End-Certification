//function for swapping the indexes of string
function getSwap(str, index1, index2) {

  if (index1 < str.length && index2 < str.length) {
    var arr = str.split('');
    var value1 = str[index1];

    arr[index1] = arr[index2];
    arr[index2] = value1;

    str = arr.join('');
  }

  return str;
}

//function to return the permutation of given string
function permAlone(str) {

  //array to store permutation (at the lowest level)
  var permutations = [];

  //Function that calculate permutations
  //| Working of Funtion is to store indexToSwap (starting from 0)
  //| Loop Through the Given Array
  //| If indexToSwap reached at the end-1 then pushed into permutation
  //| else make recursive call but pass swapped string and indexToSwap+1
  function getPermutation(str, indexToSwap) {
    for (var i = indexToSwap; i < str.length; i++) {
      if (indexToSwap === str.length - 1) {
        permutations.push(str);
      } else {
        getPermutation(getSwap(str, indexToSwap, i), indexToSwap + 1);
      }
    }
  }

  getPermutation(str, 0);

  //Get filtered array as per given scenerio
  permutations = permutations.filter(function (value) {
    return !(/(.)\1+?/.test(value));
  });

  // returns count of filtered array
  return permutations.length;
}

console.log(permAlone('ab12'));