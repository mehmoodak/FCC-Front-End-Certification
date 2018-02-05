function bouncer(arr) {
  // Don't show a false ID to this bouncer.

  var newArr = arr.filter(function (item) {
//      debugger;
    if (item !== false && item !== null && item !== '' && item !== undefined)
      if (typeof(item) == "number") {
        if (!isNaN(item))
          return item;
      } else {
        return item;
      }
  });

  return newArr;
}

console.log(bouncer([7, "ate", "", false, 9]));
