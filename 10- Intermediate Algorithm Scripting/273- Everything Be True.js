function truthCheck(collection, pre) {
  // Is everyone being true?

  for (var i = 0; i < collection.length; i++) { //looping through collection
    if (collection[i].hasOwnProperty(pre)) { //check if property exist
      if (collection[i][pre]) { //check if property is true
        continue;
      } else {
        return false; //return if property is false
      }
    } else {
      return false; // return if property doesn't exist
    }
  }

  return true; //return result of truthy function
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {
  "user": "Laa-Laa",
  "sex": "female"
}, {"user": "Po", "sex": "female"}], "sex");
