var fs = require('fs');
var dataRoot = '../x-team/node-exam/data/';

var getTagObjects = function (tagsArray, callback) {
  console.log('starting getTagObjects');
  var tagObjects = {};
  // get all files names in data directory - async
  fs.readdir (dataRoot, function (err, fileNamesArray) {
    var fileObjects = [];
    var checkAll = 0;
    // iterate through all the files in data directory
    fileNamesArray.forEach(function (fileName, index, array) {
      // retrieve all file data - async
      fs.readFile(dataRoot + fileName, 'utf8', stringToObject);
      // create objects from string output and check all async functions finish
      function stringToObject (err, fileContentString){
        try {
          contentObject = JSON.parse(fileContentString);
          fileObjects.push(contentObject);
        } catch (err) {
          console.error(err);
        }
        checkAll ++;
        if (array.length === checkAll) {
          tagObjects = calcTagCount(fileObjects);
          exitMod (tagObjects, tagsArray);
        }
      }
      // calculate the times each tag appears in the data objects - recursive
      function calcTagCount (fileObjects) {
        tagObjects = fileObjects.reduce(function(prev, currObj) {
          for (var prop in currObj) {
            if (currObj.hasOwnProperty(prop) && prop === "tags" && currObj[prop] != null ) {
              currObj[prop].forEach(function(tag) {
                prev[tag] ? ++ prev[tag] : prev[tag] = 1;
              });
            } else if (currObj.hasOwnProperty(prop) && Array.isArray(currObj[prop])){
              prev = calcTagCount (currObj[prop]);
            }
          }
        return prev;
        }, tagObjects);
      return tagObjects;
      }

      function exitMod (tagObjects, tagsArray) {
        console.log('finished getTagObjects', tagObjects);
        callback(tagObjects, tagsArray);
      }
    });
  });
};

 module.exports = getTagObjects;
