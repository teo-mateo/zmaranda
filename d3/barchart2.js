function barchart2() {

	d3.json("book/tweets.json", function (err, data) {
		var x = data;
	});

	d3.json("book/tweets.json", function (err, data) {
		var grp = d3.nest()
			.key(function(d){ 
				return d.user;
			})
			.entries(data.tweets);
		
		grp.forEach(function(el){
			el.numTweets = el.values.length;
		});
		
		generate(grp);
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
                    return yscale(d.numTweets	);
                }
			})
			.style({
				fill: "#3300cc",
				opacity: 0.25, 
				stroke: "red", 
				"stroke-width": "1px"
			});
}