function convertToRoman(num) {

  var newArr = [];
//   1,5,10,50,100,500,1000

  while (num >= 1000) {
    newArr.push('M');
    num -= 1000;
  }

  while (num >= 900) {
    newArr.push('CM');
    num -= 900;
  }

  while (num >= 500) {
    newArr.push('D');
    num -= 500;
  }

  while (num >= 400) {
    newArr.push('CD');
    num -= 400;
  }

  while (num >= 100) {
    newArr.push('C');
    num -= 100;
  }

  while (num >= 90) {
    newArr.push('XC');
    num -= 90;
  }

  while (num >= 50) {
    newArr.push('L');
    num -= 50;
  }

  while (num >= 40) {
    newArr.push('XL');
    num -= 40;
  }

  while (num >= 10) {
    newArr.push('X');
    num -= 10;
  }

  while (num >= 9) {
    newArr.push('IX');
    num -= 9;
  }

  while (num >= 5) {
    newArr.push('V');
    num -= 5;
  }

  while (num >= 4) {
    newArr.push('IV');
    num -= 4;
  }

  while (num >= 1) {
    newArr.push('I');
    num--;
  }


  return newArr.join('');
}

convertToRoman(3999);
