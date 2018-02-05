function destroyer(arr) {

  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var newArr = arr.filter(function (item) {

        if (args.indexOf(item) < 0)
          return item;

      }
  );

  return newArr;

}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
