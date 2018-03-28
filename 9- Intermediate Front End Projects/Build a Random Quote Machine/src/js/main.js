"use strict";

var nameBuilder = function nameBuilder() {
  var firstName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Johns";
  var lastName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Doe";

  console.log(firstName + " " + lastName);
};

nameBuilder();
//# sourceMappingURL=main.js.map
