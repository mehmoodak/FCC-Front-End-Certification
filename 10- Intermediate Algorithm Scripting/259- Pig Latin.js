function checkCluster(str) {
  var clusterList = ['bl', 'br', 'ch', 'ck', 'cl', 'cr', 'dr', 'fl', 'fr', 'gh', 'gl', 'gr', 'ng', 'ph', 'pl', 'pr', 'qu', 'sc', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'th', 'tr', 'tw', 'wh', 'wr'];

  var cluster = str.substr(0, 2);

//  debugger;
  if (clusterList.indexOf(cluster) >= 0) {
    str = str.slice(2);
    str = str + cluster;

    return {
      cluster: true,
      string: str
    };
  }

  return {
    cluster: false,
    string: str
  };

}

function translatePigLatin(str) {

  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var isCluster = false;

//  debugger;

  var obj = checkCluster(str);

  var arr = str.split('');

  if (vowels.indexOf(arr[0]) >= 0 && !obj.cluster) {
    arr.push('way');
  } else {

    if (obj.cluster) {
      return obj.string + 'ay';
    }
    else {
      arr.push(arr.shift());
      arr.push('ay');
    }
  }

  return arr.join('');
}

console.log(translatePigLatin("glove"));
