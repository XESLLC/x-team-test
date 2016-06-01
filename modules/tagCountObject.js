var tagCountObject = function (tagObjects, tagsArray) {
  console.log('starting tagCountObject')
  var sortedObjects = [];

  tagsArray.forEach(function(tag){
    if (!tagObjects.hasOwnProperty(tag)) {
      sortedObjects.push([tag, 0])
    }
  })

  for (var tag in tagObjects) {
    sortedObjects.push([tag, tagObjects[tag]])
  }

  sortedObjects.sort(function(a, b) {return b[1] - a[1]})

  filterObjects = sortedObjects.filter(function (tag){
    return tagsArray.indexOf(tag[0]) !== -1;
  })

  console.log('finished tagCountObject')
  return filterObjects
};

module.exports = tagCountObject;
