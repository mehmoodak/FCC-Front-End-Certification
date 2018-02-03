function myLocalScope() {
  'use strict';
  var myVar = '';

  console.log(myVar);
}
myLocalScope();

// Run and check the console
// myVar is not defined outside of myLocalScope

// Now remove the console log line to pass the test

