// Example
function ourRandomRange(ourMin, ourMax) {

  return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
}

ourRandomRange(1, 9);

// Only change code below this line.

function randomRange(myMin, myMax) {

  return Math.floor(Math.random() * ( (myMax + 1) - myMin) + myMin); // Change this line

}

// Change these values to test your function
var myRandom = randomRange(5, 15);
