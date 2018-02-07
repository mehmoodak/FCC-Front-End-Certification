//Function for converting binary numbers to decimal
function getDecimal(binary) {
  var decimal = 0;

  for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
    if (binary[i] == '1') { // if value is 1 then get the power of 2 and add it
      decimal += Math.pow(2, j);
    }
  }

  return decimal;
}

//Function that return the decode array
function decodeArray(arr) {
  var actualString = [];

  for (var i = 0; i < arr.length; i++) {
    actualString.push(String.fromCharCode(arr[i])); //Decode the array and push into actual string
  }

  return actualString;
}

function binaryAgent(str) {

  var decimalArray = [];
  var arr = str.split(' ');

  for (var a = 0; a < arr.length; a++) {
    decimalArray.push(getDecimal(arr[a])); //pushing decimals of binary into array
  }

  var actualString = decodeArray(decimalArray); //getting actual string

  return actualString.join('');
}

console.log(
    binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111")
);