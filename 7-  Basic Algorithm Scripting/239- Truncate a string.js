function truncateString(str, num) {
  // Clear out that junk in your trunk

  var newStr;

  if (str.length > num) {
    if (num > 3) {
      newStr = str.slice(0, num - 3);
    } else {
      newStr = str.slice(0, num);
    }
    newStr += '...';
    return newStr;
  } else {
    return str;
  }

}

truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length);
