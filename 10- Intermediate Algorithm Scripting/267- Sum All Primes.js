//Checking whether the provided number is prime or not
function isPrimeNumber(num) {
  for (var i = 2; i <= num; i++) {
    if (i === num) //check if last value of the actual number
      return true;
    else if (num % i === 0) //checking if divisible properly
      return false;
  }
}

function getSumOfPrimes(num) {
  var sum = 0;

  for (var i = 2; i <= num; i++) {
    if (isPrimeNumber(i)) { //if number is prime then sum
      sum += i;
    } else {
      continue;
    }
  }

  return sum;
}

function sumPrimes(num) {

  var sum = getSumOfPrimes(num);

  return sum;
}

console.log(sumPrimes(10));