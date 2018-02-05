function rot13(str) { // LBH QVQ VG!

  var newArr = [];
  var patt = /\w/;

  for (var i = 0; i < str.length; i++) {
    if (patt.test(str[i])) {

      var orgCode = str.charCodeAt(i) - 13;

      if (orgCode < 65) {
        orgCode = str.charCodeAt(i) + 13;
      }

      var orgChar = String.fromCharCode(orgCode);
      newArr.push(orgChar);

    } else {
      newArr.push(str[i]);
    }
  }

  return newArr.join('');
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
