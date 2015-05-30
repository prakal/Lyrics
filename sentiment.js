var csv = require('ya-csv');

var dictionary = {}
var reader = csv.createCsvFileReader('sentiment.csv', { columnsFromHeader: true });
reader.addListener('data', function(data) {
    // supposing there are so named columns in the source file
    dictionary[data.Word] = [
    parseFloat(data["V.Mean.Sum"]), 
    parseFloat(data["V.SD.Sum"]),
    parseFloat(data["A.Mean.Sum"]),
    parseFloat(data["A.SD.Sum"])
    ];
});

reader.addListener('end', function() {
	console.log(sentiment("baby you light up my world like nobody else"));
	console.log(sentiment("she lives with a broken man a cracked polystyrene man who just crumbles and burns"));
	console.log(sentiment("super fresh now watch me jock jocking on them haters man when i do that soulja boy"));
})



var sentiment = function(string) {
	var words = string.split(' ');
	var sum = 0;
	var sdSum = 0;
	var highestVal = 0;
	var lowestVal = 9999999;
	var highestSd = 0;

	var sdSumA = 0;
	var highestValA = 0;
	var lowestValA = 9999999;
	var highestSdA = 0;

	for(var i = 0; i < words.length; i++)
	{
		var score = dictionary[words[i]];
		if(score) {
			sdSum +=  score[1];
			if(score[0] > highestVal)
				highestVal = score[0];
			if(score[0] < lowestVal)
				lowestVal = score[0];

			if(score[1] > highestSd)
			{
				highestSd = score[1];
			}

			sdSumA += score[2];
			if(score[2] > highestValA)
				highestValA = score[2];
			if(score[2] < lowestValA)
				lowestValA = score[2];

			if(score[3] > highestSd)
			{
				highestSdA = score[3];
			}
		}
	}

	var dist = highestVal - lowestVal;
	var distA = highestValA - lowestValA;

	return [lowestVal + dist * highestSd/sdSum, lowestValA + distA * highestSdA/sdSumA];
}

