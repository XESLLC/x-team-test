// require node module fs
var fs = require('fs');

var getTagsArray = function (callback) {
  var tagsArray;
  console.log("starting getTagsArray");
  // use file for input if no CLI arguments after first 2 defaults are provided
  if (process.argv.length < 3) {
    fs.readFile('./node-exam/tags.txt', 'utf8', tagsStringToArray);

  } else {
    //check for CLI arguments after the first two defaults
    var commandLineTagsArray = [];
    process.argv.forEach(function (tag) {
      commandLineTagsArray.push(tag);
    });
    commandLineTagsArray.splice(0,2);
    tagsArray = commandLineTagsArray;
    // maintain asynch behavoir of module
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
