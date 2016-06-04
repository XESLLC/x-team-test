// load modules
var fs = require('fs');

function check (tagsArray, logAnswer, getTagObjects, afterGetTagObjects) {
  console.log('starting check');
  // if cache.txt read it and get string value of answers
  fs.readdir ('../x-team', function (err, fileNamesArray) {
    if (fileNamesArray.indexOf('cache.txt') !== -1) {
      fs.readFile('./cache.txt', 'utf8', function(err, cachedOrderedStrings) {
        var cachedAnswer;
        if (err) {console.log(err);}
        var answerArray = cachedOrderedStrings.split('***');
        answerArray.pop();
        answerArray.shift();
        var answer = false;
        // check user input with cached user inputs
        answerArray.forEach(function (cachedElem) {
          var filterElemString = cachedElem.replace("\n", "");
          var filterElemArray = filterElemString.split(",");
          var isEqualLength = filterElemArray.length-1 === tagsArray.length;
          tagsArray.forEach(function (tag){
            // if inputs match and are equal length, capture answer
            if (!answer && isEqualLength) {
            answer = (filterElemArray.indexOf(tag) !== -1);
            // last item in array is answer
            cachedAnswer = filterElemArray.pop();
            }
          });
        });
        console.log("finished check and retrieved cached answer -", answer || false);
        if (answer) {
          logAnswer (cachedAnswer);
        } else {
          getTagObjects(tagsArray, afterGetTagObjects);
        }
      });
    } else {
      // if no cache.txt, set up file with initial *** used for future parsing
      fs.appendFile('../x-team/cache.txt', '***' , 'utf8', function (err){
        if (err) {console.log(err);}
        console.log("finished check and retrieved cached answer -", false);
        getTagObjects(tagsArray, afterGetTagObjects);
      });
    }
  });
}

// cache the answer
function writeAnswer (cacheAnswerString, orderedString, logAnswer) {
  console.log('starting writeAnswer');
  fs.appendFile('./cache.txt', cacheAnswerString , 'utf8', function (err){
    if (err) {console.log(err);}
    console.log('finished writeAnswer');
    logAnswer(orderedString);
  });
}

module.exports = {
  check: check,
  writeAnswer: writeAnswer
};
