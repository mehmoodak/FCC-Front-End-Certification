function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor

//   var arr = str.split('');

  for (var i = 0; i < target.length; i++) {
    var searchIndex = -(i + 1);

    var subChar = str.substr(searchIndex, 1);
    var targetChar = target.substr(searchIndex, 1);

    if (subChar == targetChar) {
      if (i == (target.length - 1)) {
        return true;
      }
    }
  }
  return false;
}

confirmEnding("He has to give me a new name", "name");