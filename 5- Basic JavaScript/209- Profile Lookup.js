//Setup
var contacts = [
  {
    "firstName": "Akira",
    "lastName": "Laine",
    "number": "0543236543",
    "likes": ["Pizza", "Coding", "Brownie Points"]
  },
  {
    "firstName": "Harry",
    "lastName": "Potter",
    "number": "0994372684",
    "likes": ["Hogwarts", "Magic", "Hagrid"]
  },
  {
    "firstName": "Sherlock",
    "lastName": "Holmes",
    "number": "0487345643",
    "likes": ["Intriguing Cases", "Violin"]
  },
  {
    "firstName": "Kristian",
    "lastName": "Vos",
    "number": "unknown",
    "likes": ["Javascript", "Gaming", "Foxes"]
  }
];


function lookUpProfile(firstName, prop) {
// Only change code below this line

  console.log(Object.getOwnPropertyNames(contacts[0]));
  console.log(Object.getOwnPropertyNames(contacts[0]).includes(prop));

  if (Object.getOwnPropertyNames(contacts[0]).includes(prop)) {

    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].firstName == firstName) {
        return contacts[i][prop];
      }
    }

    return 'No such contact';

  } else {
    return 'No such property';
  }

// Only change code above this line
}

// Change these values to test your function
lookUpProfile("Akira", "likes");