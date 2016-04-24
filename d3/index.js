var http = require('http');
var d3 = require('d3');

var F = {
	TWEETS: {
		URL: "http://localhost:8081/book/tweets.json", 
		DATA: ""
	}
};

/*
http.get(F.TWEETS.URLcd, function(response){
	response.on('data', function(chunk){
		F.TWEETS.DATA += chunk;
	});
});
*/

d3.json(F.TWEETS.URL, function(data){
	var tweetData = data.tweets;
	var nestedTweets = d3.nest()
		.key(function(el){ return el.user;})
		.entries(tweetData);
});

var dbg = 1;