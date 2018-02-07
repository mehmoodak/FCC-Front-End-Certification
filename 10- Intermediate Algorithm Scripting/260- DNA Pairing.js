function pairElement(str) {

  str = str.split('');
  var arr2d = [];


  for (var i = 0; i < str.length; i++) {
    if (str[i] == 'G') {
      arr2d.push(['G', 'C']);
    } else if (str[i] == 'C') {
      arr2d.push(['C', 'G']);
    } else if (str[i] == 'A') {
      arr2d.push(['A', 'T']);
    } else if (str[i] == 'T') {
      arr2d.push(['T', 'A']);
    }
  }

  return arr2d;
}

pairElement("GCG");
