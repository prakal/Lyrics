var sys = require("sys");

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    var str = d.toString().substring(0, d.length-1);
    console.log('str',str);

	var request = require("request"),
		cheerio = require("cheerio"),
		// url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;
		url = "http://search.azlyrics.com/search.php?q=" + str;
	console.log('url',url);
	request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
				// temperature = $("[data-variable='temperature'] .wx-value").html();
				// temperature = Object.keys($('.text-left')[0].children[0]);
				songUrl = ($('.text-left a').attr('href'));
				
			console.log("The link to song is: " + songUrl);
			request(songUrl, function (error, response, body) {
				if (!error) {
					var $ = cheerio.load(body),
						// temperature = $("[data-variable='temperature'] .wx-value").html();
						// temperature = Object.keys($('.text-left')[0].children[0]);
						songLyrics = $('div');
						var song;
						for (var i = 0; i < songLyrics.length; i++){
							if (songLyrics[i].children.length > 60){
								console.log('lyrics found',i);
								song = songLyrics[i];
								break;
							}
						}
						
					console.log("The lyrics to song is: " + (song.next.data));
				} else {
					console.log("We’ve encountered an error: " + error);
				}
		  });
		} else {
			console.log("We’ve encountered an error: " + error);
		}
  });
});
