function repeatStringNumTimes(str, num) {

  if (num < 1) {
    return '';
  }
  else {

    var arr = [];

    while (num) {
      arr.push(str);
      num--;
    }

    return arr.join('');
  }
}

repeatStringNumTimes("abc", 3);
