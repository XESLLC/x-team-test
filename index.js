// load modules
var getTagsArray = require('./modules/getTagsArray');
var getTagObjects = require('./modules/getTagObjects');
var tagCountObject = require('./modules/tagCountObject');
var countedTagArrayToString = require('./modules/countedTagArrayToString');

// get tags from the CLI argument
// and continue to afterGetTagsArray function after getTagsArray finishes
getTagsArray(afterGetTagsArray);


// get tags from the data files
// and continue to afterGetTagObjects function after getTagObjects finishes
function afterGetTagsArray (tagsArray) {
  getTagObjects(tagsArray, afterGetTagObjects);
}

// get arrays for the inputed tags
// order the tags from most listed to not listed and stringify for logging.
function afterGetTagObjects (tagObjects, tagsArray) {
var countedTagArrays = tagCountObject(tagObjects, tagsArray);
var orderedString = countedTagArrayToString(countedTagArrays);
console.log(orderedString);
}
