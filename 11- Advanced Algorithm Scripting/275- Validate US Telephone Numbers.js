//To check whether the given string have balanced parenthesis or not
function isBalanced(str) {

  var count = 0; //count for the track of opening parenthesis
  for (var i = 0; i < str.length; i++) {
    if (str[i] == '(') {
      count++;
    }
    else if (str[i] == ')') {
      if (count == 0)
        return false;
      else
        count--; //decrease count if parenthesis closed
    }
  }

  return count === 0 ? true : false; //return true if 0 means all parenthesis are closed
}

function telephoneCheck(str) {
  // Good luck!

  if (isBalanced(str)) {
    // (^) indicate start
    // (?) indicate 1 or nothing
    // (\s) indicate space
    // (\d) indicate digit
    // ($) indicate end
    if (/^1?\s?\(?\d\d\d\)?-?\s?\d\d\d-?\s?\d\d\d\d$/.test(str)) { //checking for all expressions stated in use case
      return true;
    }
  }

  return false;
}


telephoneCheck("1 (555) 555-5555");
