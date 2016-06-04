// load modules
var getTagsArray = require('./modules/getTagsArray');
var getTagObjects = require('./modules/getTagObjects');
var tagCountObject = require('./modules/tagCountObject');
var countedTagArrayToString = require('./modules/countedTagArrayToString');
var checkCache = require('./modules/cache').check;
var writeAnswerToCache = require('./modules/cache').writeAnswer;


// get tags from the CLI argument then run afterGetTagsArray function
getTagsArray(afterGetTagsArray);

function afterGetTagsArray (tagsArray) {
  // get file names in root dir and check for cached results
  checkCache(tagsArray,logAnswer, getTagObjects, afterGetTagObjects);
}

// get arrays for the inputed tags
// order the tags from most listed to not listed and stringify for logging.
function afterGetTagObjects (tagObjects, tagsArray) {
  var countedTagArrays = tagCountObject(tagObjects, tagsArray);
  var orderedString = countedTagArrayToString(countedTagArrays);
  // mutate answer to cache and for future parsing
  var cacheAnswerString = "\n" + tagsArray.toString() + "," + orderedString + '\n***';
  // write to cache then call logAnswer function
  writeAnswerToCache(cacheAnswerString, orderedString, logAnswer);
}

function logAnswer (answerString) {
    console.log(answerString);
}
