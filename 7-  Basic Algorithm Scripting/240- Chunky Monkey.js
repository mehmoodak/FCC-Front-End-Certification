function chunkArrayInGroups(arr, size) {
  // Break it up.
  var arr2d = [];
  var length = Math.ceil(arr.length / size);

  for (var i = 0; i < length; i++) {
    var newArr = arr.slice((i * size), ((i + 1) * size));

    if (newArr) {
      arr2d.push(newArr);
    }
  }

  return arr2d;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);
