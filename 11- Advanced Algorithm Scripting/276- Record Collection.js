// Setup
var collection = {
  "2548": {
    "album": "Slippery When Wet",
    "artist": "Bon Jovi",
    "tracks": [
      "Let It Rock",
      "You Give Love a Bad Name"
    ]
  },
  "2468": {
    "album": "1999",
    "artist": "Prince",
    "tracks": [
      "1999",
      "Little Red Corvette"
    ]
  },
  "1245": {
    "artist": "Robert Palmer",
    "tracks": []
  },
  "5439": {
    "album": "ABBA Gold"
  }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {

  var keys = Object.keys(collectionCopy); // Getting keys of collection for looping
  for (var i = 0; i < keys.length; i++) {
    if (collectionCopy[keys[i]].hasOwnProperty(prop)) { //Checking objects having given prop

      if (value === '') { //delete if empty
        delete collectionCopy[keys[i]][prop];
      } else {
        if (prop === 'tracks') { // if tracks then push into array
          collectionCopy[keys[i]][prop].push(value);
        } else { //setting value
          collectionCopy[keys[i]][prop] = value;
        }
      }

    } else { // if collection's object have no value
      if (prop === 'tracks') {  //set array if tracks
        collectionCopy[keys[i]][prop] = [value];
      } else { //set value
        collectionCopy[keys[i]][prop] = value;
      }
    }
  }

  return collectionCopy;
}

// Alter values below to test your code
console.log(updateRecords(5439, "artist", "ABBA"));