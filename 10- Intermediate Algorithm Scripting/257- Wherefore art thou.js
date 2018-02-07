function pushIntoArray(arr, obj) {

//    debugger;

  if (arr.length == 0) {
    arr.push(obj);
  } else {

    arr.push(obj);

  }
}

function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  var keysToFind = Object.keys(source);

//    debugger;

  for (var i = 0; i < Object.keys(collection).length; i++) {
    for (var j = 0; j < keysToFind.length; j++) {
      if (collection[i].hasOwnProperty(keysToFind[j])) {
        var a = collection[i][keysToFind[j]];
        var b = source[keysToFind[j]];
        if (collection[i][keysToFind[j]] !== source[keysToFind[j]]) {
          break;
        } else if (j == keysToFind.length - 1) {
//            arr.push(collection[i]);
          pushIntoArray(arr, collection[i]);
        }
      }
    }
  }


  // Only change code above this line
  return arr;
}

whatIsInAName([{"a": 1, "b": 2}, {"a": 1}, {"a": 1, "b": 2, "c": 2}, {"a": 1, "b": 2}], {last: "Capulet"});
