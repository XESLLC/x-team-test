var getTagsArray = require('./modules/getTagsArray');
var getTagObjects = require('./modules/getTagObjects');
var tagCountObject = require('./modules/tagCountObject');
var countedTagArrayToString = require('./modules/countedTagArrayToString');

getTagsArray(afterGetTagsArray);

function afterGetTagsArray (tagsArray) {
  getTagObjects(tagsArray, afterGetTagObjects);
}

function afterGetTagObjects (tagObjects, tagsArray) {
var countedTagArrays = tagCountObject(tagObjects, tagsArray);
var orderedString = countedTagArrayToString(countedTagArrays);
console.log(orderedString);
}
