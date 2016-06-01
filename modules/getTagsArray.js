var fs = require('fs');

var getTagsArray = function (callback) {
  var tagsArray
  console.log("starting getTagsArray");
  if (process.argv.length < 3) {
    fs.readFile('./node-exam/tags.txt', 'utf8', tagsStringToArray)
    function tagsStringToArray(err, tagsString){
      tagsArray = tagsString.split("\n");
      tagsArray.pop();
      exitMod();
    }
  } else {
    var commandLineTagsArray = [];
    process.argv.forEach(function (tag) {
      commandLineTagsArray.push(tag);
    });
    commandLineTagsArray.splice(0,2);
    tagsArray = commandLineTagsArray;
    process.nextTick(exitMod);
  }

  function exitMod () {
    console.log("finished getTagsArray", tagsArray);
    callback(tagsArray);
  };

};

module.exports = getTagsArray;
