function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;

  var ansArray = [];

  //calculating the orbitalPeriod
  function getOrbitalPeriod(avgAlt) {
    var ans = Math.pow((earthRadius + avgAlt), 3);
    ans = Math.sqrt(ans / GM);
    ans = 2 * Math.PI * ans;

    return Math.round(ans, 0);
  }

  //loop to calculate each orbital period and then pushing into array
  for (var i = 0; i < arr.length; i++) {
    var orbitalPeriod = getOrbitalPeriod(arr[i].avgAlt);
    ansArray.push({name: arr[i].name, orbitalPeriod: orbitalPeriod});
  }

  return ansArray;
}

orbitalPeriod([{name: "sputnik", avgAlt: 35873.5553}]);
