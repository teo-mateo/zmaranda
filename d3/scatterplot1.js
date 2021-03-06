function scatterplot1() {

	d3.json("book/tweets.json", function (err, data) {
		
		var tweets = data.tweets;
		
		tweets.forEach(function(el){
			el.impact = el.favorites.length + el.retweets.length;
			el.tweetTime = new Date(el.timestamp);
		});

		var svg_h = parseInt(d3.select("body")
			.select("svg")
			.style("height"));
		var svg_w = parseInt(d3.select("body")
			.select("svg")
			.style("width"));

		
		var maxImpact = d3.max(tweets, function(el) { return el.impact; });
		var startEnd = d3.extent(tweets, function(el) { return el.tweetTime; } );
		var timeRamp = d3.time.scale().domain(startEnd).range([20, svg_h-20]);
		var yScale = d3.scale.linear().domain([0, maxImpact]).range([0, svg_h-40]);
		var radiusScale = d3.scale.linear().domain([0, maxImpact]).range([1, 20]);
		var colorScale = d3.scale.linear().domain([0, maxImpact]).range(["white", "#990000"]);
		

			
			
		d3.select("body").select("svg")
			.selectAll("circle")
			.data(tweets)
			.enter()
				.append("circle")
				.attr({
					r: function(d){ 
						return radiusScale(d.impact); 
					}, 
					cx: function(d) { 
						return timeRamp(d.tweetTime); 
					}, 
					cy: function(d) { 
						return svg_h - 20 - yScale(d.impact); 
					}, 
					fill: function(d) { 
						return colorScale(d.impact); 
					},
					stroke: "black",
					"stroke-width": "1px", 
					opacity: 1	
				});
		});
}

function generate(data){
	
	var svg_h = parseInt(d3.select("body")
        .select("svg")
        .style("height"));
    var svg_w = parseInt(d3.select("body")
        .select("svg")
        .style("width"));
    
    var yscale = d3.scale.linear()
        .domain([0, 10])
        .range([0,svg_h-50]);
	
	d3.select("body")
        .select("svg")
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
			.attr({
				x: function (d,i) { return i*30+(2*i);},
				y: function(d) { 
                    return svg_h - yscale(d.numTweets);
                },
				width: 30, 
				height: function(d) { 
                    return yscale(d.numTweets);
                }
			})
			.style({
				fill: "#3300cc",
				opacity: 0.25, 
				stroke: "red", 
				"stroke-width": "1px"
			});
}