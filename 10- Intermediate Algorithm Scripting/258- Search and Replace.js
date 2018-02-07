function capitalize(str) {

  var a = str.split('');
  a[0] = a[0].toUpperCase();

  return a.join('');

}

function noCapitalize(str) {

  var a = str.split('');
  a[0] = a[0].toLowerCase();

  return a.join('');

}


function myReplace(str, before, after) {

  var newStr;

  if (before.charAt(0) === before.charAt(0).toUpperCase()) {
    newStr = str.replace(before, capitalize(after));
  }
  else if (before.charAt(0) === before.charAt(0).toLowerCase()) {
    after[0] = after[0].toLowerCase();
    newStr = str.replace(before, noCapitalize(after));
  }
  return newStr;
}

console.log(myReplace("He is Sleeping on the couch", "Sleeping", "sitting"));
