function mutation(arr) {

  var string = arr[0].toLowerCase();
  var toSearch = arr[1].toLowerCase();

//     debugger;
  for (var i = 0; i < toSearch.length; i++) {

    var isExist = string.indexOf(toSearch[i]);

    if (isExist < 0) {
      return false;
    } else {
      if (i == toSearch.length - 1) {
        return true;
      }
    }
  }
  return false;
}

mutation(["floor", "for"]);