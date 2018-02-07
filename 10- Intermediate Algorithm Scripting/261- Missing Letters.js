function fearNotLetter(str) {

  var startCode = str.charCodeAt(0);
  var endCode = str.charCodeAt(str.length - 1);

  for (var i = startCode, j = 0; i <= endCode; i++, j++) {
    if (i == str.charCodeAt(j)) {
      continue;
    } else {
      return String.fromCharCode(i);
    }
  }

  return undefined;
}

fearNotLetter("abce");
