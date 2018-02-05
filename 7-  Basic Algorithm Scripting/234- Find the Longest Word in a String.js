function findLongestWord(str) {

  arr = str.split(' ');
  index = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length > arr[index].length)
      index = i;
    else
      continue;
  }

  return arr[index].length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");
