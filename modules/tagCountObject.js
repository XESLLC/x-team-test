var tagCountObject = function (tagObjects, tagsArray) {
  console.log('starting tagCountObject');
  var sortedObjects = [];
  // if input tags does not exist in tagObjects add tag prop equal to 0
  tagsArray.forEach(function(tag){
    if (!tagObjects.hasOwnProperty(tag)) {
      sortedObjects.push([tag, 0]);
    }
  });
  // change object into array of arrays
  for (var tag in tagObjects) {
    sortedObjects.push([tag, tagObjects[tag]]);
  }

  sortedObjects.sort(function(a, b) {return b[1] - a[1];});
  // remove tags not provided in the input(CLI or file)
  filterObjects = sortedObjects.filter(function (tag){
    return tagsArray.indexOf(tag[0]) !== -1;
  });

  console.log('finished tagCountObject');
  return filterObjects;
};

module.exports = tagCountObject;
