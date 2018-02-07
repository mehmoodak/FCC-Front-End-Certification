//  getting the Fibanocci Series
function getFibanocciSeries(num) {

  var arr = [];

  for (var i = 0; i < num; i++) {

    if (i === 0 || i === 1) {
      arr.push(1); //pushing 1 on first two index
    } else {
      if (arr[i - 1] + arr[i - 2] > num) { //break if sum exceeds than provided number
        break;
      }
      else {
        arr.push(arr[i - 1] + arr[i - 2]); // pushing sum of previous two in new ones
      }
    }

  }

  return arr; //returning fibanocci array

}

//  returning sum of odd numbers in an array
function sumOfOdd(arr) {

  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) //checking odds
      sum += arr[i];
  }

  return sum;
}

function sumFibs(num) {

//    debugger;
  var fibArr = getFibanocciSeries(num);
  var sum = sumOfOdd(fibArr);

  return sum;
}

sumFibs(4);
