function getIndexToIns(arr, num) {
  // Find my place in this sorted array.

  arr.push(num);
  arr.sort(function compare(a, b) {
    if (a < b)
      return -1;
    else if (a == b)
      return 0;
    else if (a > b)
      return 1;
  });

  return arr.indexOf(num);
}

getIndexToIns([3, 10, 5], 3);
