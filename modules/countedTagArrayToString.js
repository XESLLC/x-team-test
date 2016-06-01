var countedTagArrayToString = function (countedTagArrays) {
  console.log('starting countedTagArrayToString')
  var orderedString = "\n```\n"

  countedTagArrays.forEach(function (tagArray){
    orderedString = orderedString + tagArray[0] + " ".repeat(15 - tagArray[0].length) +tagArray[1] + '\n'
  }),
  
  orderedString = orderedString + '```'
  console.log('finished countedTagArrayToString')
  return orderedString;
}
module.exports = countedTagArrayToString;
