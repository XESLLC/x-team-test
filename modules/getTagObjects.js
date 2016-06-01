var fs = require('fs');
var dataRoot = '../x-team/node-exam/data/'

var getTagObjects = function (tagsArray, callback) {
  console.log('starting getTagObjects');
  var tagObjects = {};

  fs.readdir (dataRoot, function (err, fileNamesArray) {
    var fileObjects = [];
    var checkAll = 0

    fileNamesArray.forEach(function (fileName, index, array) {

      fs.readFile(dataRoot + fileName, 'utf8', stringToObject);

      function stringToObject (err, fileContentString){
        try {
          contentObject = JSON.parse(fileContentString)
          fileObjects.push(contentObject);
        } catch (err) {
          console.error(err);
        };
        checkAll ++
        if (array.length === checkAll) {
          tagObjects = calcTagCount(fileObjects)
          exitMod (tagObjects, tagsArray)
        }
      }

      function calcTagCount (fileObjects) {
        tagObjects = fileObjects.reduce(function(prev, curr) {
          for (var prop in curr) {
            if (curr.hasOwnProperty(prop) && prop === "tags" && curr[prop] != null ) {
              curr[prop].forEach(function(tag) {
                prev[tag] ? ++ prev[tag] : prev[tag] = 1;
              })
            } else if (curr.hasOwnProperty(prop) && Array.isArray(curr[prop])){
              prev = calcTagCount (curr[prop])
            }
          }
        return prev
        }, tagObjects);
      return tagObjects
      }

      function exitMod (tagObjects, tagsArray) {
        console.log('finished getTagObjects', tagObjects);
        callback(tagObjects, tagsArray);
      }
    })
  })
}

 module.exports = getTagObjects;
