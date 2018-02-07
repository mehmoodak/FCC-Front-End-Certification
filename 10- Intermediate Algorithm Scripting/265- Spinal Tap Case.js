//Putting space before capital character if not
// exist and change string in to lower case.
function spaceBetweenSentence(str) {

  str = str.split('');

  for (var i = 0; i < str.length; i++) {
    //Check UpperCase, Space and Dashes if not then put space or space+char depending on the condition.
    if (str[i] == str[i].toUpperCase() && str[i] !== ' ' && str[i] !== '-') {
      if (str[i] === '_') //put space if underscore
        str[i] = ' ';
      else if (i > 0 && str[i - 1] !== ' ') //put space+char if previous character is not space
        str[i] = ' ' + str[i];

    } else {
      continue;
    }
  }
  return str.join('').toLowerCase();
}


//Put dashes inplace of spaces and underscore
function putDashes(str) {

  str = str.replace(/\s/ig, '-');

  return str;
}

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins

  str = spaceBetweenSentence(str);
  str = putDashes(str);

  return str;
}

console.log(spinalCase('The_Andy_Griffith_Show'));