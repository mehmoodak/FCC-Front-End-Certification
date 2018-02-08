function checkCashRegister(price, cash, cid) {
  var changeRemaining = cash - price;

  // Checking if drawer is empty or not
  function isDrawerEmpty(drawer) {
    for (var i = 0; i < drawer.length; i++) {
      if (drawer[i][1] !== 0)
        return false;
    }
    return true;
  }

  // To get change from the drawer
  function getChange(changeRemaining, drawer) {
    var changeReturned = [];

    //Get value of currency for calculation
    function getCurrencyValue(str) {

      if (str === 'PENNY') {
        return 0.01;
      } else if (str === 'NICKEL') {
        return 0.05;
      } else if (str === 'DIME') {
        return 0.1;
      } else if (str === 'QUARTER') {
        return 0.25;
      } else if (str === 'ONE') {
        return 1;
      } else if (str === 'FIVE') {
        return 5;
      } else if (str === 'TEN') {
        return 10;
      } else if (str === 'TWENTY') {
        return 20;
      } else if (str === 'ONE HUNDRED') {
        return 100;
      }
      return undefined; //if currency is not these
    }

    //check if the passed currency is already exists in changeReturned
    function isAlreadyInChange(str) {
      for (var i = 0; i < changeReturned.length; i++) {
        if (changeReturned[i][0] === str)
          return i; // return index if currecy exist
      }
      return false; //return undefined if not exist
    }

    //Perform calculation depending on the given use case
    function calculateChange() {

      //Perform arithematic operation on drawer and change
      function calculation() {
        drawer[i][1] -= currency;
        drawer[i][1] = Math.round(drawer[i][1] * 100) / 100;

        changeRemaining -= currency;
        changeRemaining = Math.round(changeRemaining * 100) / 100;
      }

      //Loop through the drawer and sort returned cash in descending order
      for (var i = drawer.length - 1; i >= 0; i--) {

        //Get actual mathmatical value of currency
        var currency = getCurrencyValue(drawer[i][0]);

        //while change is gretter than currency and drawer have cash in that currency
        while (changeRemaining >= currency && drawer[i][1] !== 0) {

          //Get index if currency exists in changeReturned array
          var index = isAlreadyInChange(drawer[i][0]);

          //True - Start to put currency on changeReturned
          //False - Calculation  on already existed
          if (index === false) {
            // Push new currency on changeReturned array
            changeReturned.push([drawer[i][0], currency]);
          } else {
            //Addition on changeReturned of that currency
            //Round is must (because decimal at the very end occurs automatically)
            changeReturned[index][1] = Math.round((changeReturned[index][1] + currency) * 100) / 100;
          }

          //Calculate drawer and change remaining
          calculation();

        }


        if (changeRemaining === 0)
          break;
      }

    }


    calculateChange(); //perform calculations

    return (changeRemaining !== 0) ? false : {change: changeReturned};

  }

  //Get Change or Message depending on the given conditions
  function getChangeOrMessage() {
    if (changeRecieved === false) //if change is not returned due to insufficient cash
      return 'Insufficient Funds';
    else if (changeRecieved) {
      if (isDrawerEmpty(cid)) { //if change returned but drawer is empty
        return 'Closed';
      } else { // if change returned while having cash on drawer
        return changeRecieved.change;
      }
    }
  }

  var changeRecieved = getChange(changeRemaining, cid);

  return getChangeOrMessage();
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

console.log(
    checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
);