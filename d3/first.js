function loaded(){
	d3.select("svg")
		.append("circle")
		.attr({ r: 20, cx: 20, cy: 20 })
		.style("fill", "red");
	d3.select("svg")
		.append("text")
		.attr( { id: "a", x: 20, y: 20})
		.style("opacity", 0)
		.text("HELLO WORLD");
	d3.select("svg")
		.append("circle")
		.attr({cx: 400, cy: 400, r: 100})
		.style("fill", "lightblue");
	d3.select("svg")
		.append("text")
		.attr({id: "b", x: 400, y: 400})
		.style("opacity", 0)
		.text("Uh, hi.");
	
	d3.select("#a").transition().delay(1000).style("opacity", 1);
	d3.select("#b").transition().delay(3000).style("opacity", 0.75);
	d3.selectAll("circle")
		.transition()
		.delay(5000)
		.duration(1000)
		.attr("cy", 200);
	
}

/*
	d3.csv('book/cities.csv', function(error, data) {
		console.log(data);
	});
	d3.csv('book/tweetdata.csv', function(err, data){
		console.log(data);
	});

	var colRamp = d3.scale.linear()
		.domain([500000, 13000000])
		.range(["blue", "red"]);

	d3.json("book/tweets.json", function(data){
		var tweetData = data.tweets;
		var nestedTweets = d3.nest()
			.key(function(el){ return el.user;})
			.entries(tweetData);
	});

	d3.csv("book/cities.csv", function(data){
		var min = d3.min(data, function(el){ return +el.population;});
		var max = d3.max(data, function(el){ return +el.population;});
		var mean = d3.mean(data, function(el){ return +el.population});
		var ext = d3.extent(data, function(el) { return +el.population;})
	});
*/

function dataViz(incomingData){
	
	var selection = d3.select("body").selectAll("div.cities")
		.data(incomingData);

	//update
	selection
		.attr('class', 'cities')
		.html(function(d,i){
			return d.label;
		});

	//add new
	selection
		.enter()
		.append("div")
			.attr('class', 'cities')
			.html(function(d,i){
				return d.label;
			});

	//remove
	selection
		.exit()
		.remove();
}

