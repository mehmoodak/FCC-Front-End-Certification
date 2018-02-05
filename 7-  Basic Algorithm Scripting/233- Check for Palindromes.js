function palindrome(str) {
  // Good luck!

//   str = "A man, a plan, a canal. Panama";

  var strippedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  var reverseStr = strippedStr.split('').reverse().join('');

  if (reverseStr == strippedStr)
    return true;
  else
    return false;
}

palindrome("eye");
