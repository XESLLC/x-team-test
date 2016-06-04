// require node module fs
var fs = require('fs');

var getTagsArray = function (callback) {
  console.log("starting getTagsArray");
  var tagsArray;
  // use txt file for input if no 3rd CLI argument provided - the first two elements default to ([0] node and [1] name of js file)
  if (process.argv.length < 3) {
    fs.readFile('./node-exam/tags.txt', 'utf8', tagsStringToArray);
  } else {
    //get 3rd CLI argument & maintain async behavior of module
    commandLineTagsString = process.argv[2];
    tagsArray = commandLineTagsString.split(",");
    process.nextTick(exitMod);
  }

  function tagsStringToArray(err, tagsString){
    tagsArray = tagsString.split("\n");
    tagsArray.pop();
    exitMod();
  }

  function exitMod () {
    console.log("finished getTagsArray", tagsArray);
    callback(tagsArray);
  }
};

module.exports = getTagsArray;
