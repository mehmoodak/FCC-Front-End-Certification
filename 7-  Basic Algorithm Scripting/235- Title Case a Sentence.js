function titleCase(str) {

  var newArr = [];
  var arr = str.split(' ');

  for (var i = 0; i < arr.length; i++) {

    if (i !== 0)
      newArr.push(' ');

    for (var j = 0; j < arr[i].length; j++) {

      if (j == 0)
        newArr.push(arr[i][j].toUpperCase());
      else
        newArr.push(arr[i][j].toLowerCase());

    }
  }

  return newArr.join('');
}

titleCase("i'm a little tea pot");
