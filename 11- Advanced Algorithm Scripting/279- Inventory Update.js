function updateInventory(curInv, newInv) {
  // All inventory must be accounted for or you're fired!

  //Function to add or update the inventory
  function addOrUpdate() {
    for (var i = 0; i < newInv.length; i++) {
      var isUpdate = false;
      for (var j = 0; j < curInv.length; j++) {
        //if item is in invertory then update its quantity
        if (newInv[i][1] === curInv[j][1]) {
          curInv[j][0] += newInv[i][0];
          isUpdate = true;
        }

      }

      //if item is not update because its not exists then add it
      if (!isUpdate) {
        curInv.push(newInv[i]);
      }
    }
  }

  addOrUpdate();

  //sort the invertory base on its inventory names
  curInv.sort(function (a, b) {

    if (a[1] < b[1])
      return -1;
    else if (a[1] > b[1]) {
      return 1;
    } else if (a[1] === b[1])
      return 0;
  });

  return curInv;
}

// Example inventory lists
var curInv = [
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
];

var newInv = [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

