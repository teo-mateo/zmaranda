function createSoccerViz(url){
	d3.csv(url, function(data){
		overallTeamViz(data);

	});
}

function overallTeamViz(incomingData) {
	d3.select("svg")
		.append("g")
		.attr("id", "teamG")
		.attr("transform", "translate(50, 250)")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append("g")
		.attr("class", "overallG")
		.attr("transform",
		function (d, i) {
			return "translate(" + i * 50 + ", 0)";
		});

	var teamG = d3.selectAll("g.overallG");

	teamG
		.append("circle")
		.style("fill", "pink")
		.style("stroke", "black")
		.style("stroke-width", "1px")
		.attr("r", 0) 		// POINT
		.transition().delay(function (d, i) {
			return 100 * i;
		})
		.duration(500)
		.attr("r", 40)	// GROW TO 40
		.transition()
		.duration(500)
		.attr("r", 20); // SHRINK BACK TO 20

	teamG
		.append("text")
		.attr("text-anchor", "middle")
		.attr("y", 30)
		.attr("font-size", "10px")
		.text(function (d) {
			return d.team;
		});
	// teamG
	// 	.insert("image", "text")
	// 	.attr("xlink:href", function(d){ return "book/images/" + d.team + ".png";})
	// 	.attr("width", "25px")
	// 	.attr("height", "20px")
	// 	.attr("x", -12)
	// 	.attr("y", -10);

	var btnData = Object.keys(incomingData[0]).filter(function (d) {
		return d != "team" && d != "region";
	})
	//generate the buttons
	d3.select("body")
		.selectAll("input")
		.data(btnData)
		.enter()
		.append("button")
		.html(function (d) {
			return d;
		})
		.on("click", buttonClick);

	function buttonClick(buttonData) {
		var max = d3.max(incomingData, function (d) {
			return d[buttonData];
		});

		var radiusScale = d3.scale.linear()
			.domain([0, max]).range([2, 20]);

		var colorScale = d3.scale.linear()
			.interpolate(d3.interpolateHcl)
			.domain([0, max]).range(["yellow", "green"]);

		d3.selectAll("g.overallG").select("circle").transition().duration(500)
			.attr("r", function(d){ return radiusScale(d[buttonData]);})
			.style("fill", function(d) { return colorScale(d[buttonData]);});

	}

	teamG.on("mouseover", highlightRegion);
	teamG.on("mouseout", unHighlight)

	function highlightRegion(d, i) {

		var teamColor = d3.rgb("pink");


		//d3.select(this).select("text").classed("active", true).attr("y", 10);
		d3.selectAll("g.overallG").select("text").each(function(p){
		});

		d3.selectAll("g.overallG")
			.select("circle")
			.style("fill", function (e) {
				return d.region === e.region ? teamColor.brighter(0.5) : teamColor;
			});

		this.parentElement.appendChild(this);

	}

	function unHighlight() {
		d3.selectAll("g.overallG")
			.select("text")
			.attr({
				"class": "",
				"y": 30
			})

		d3.selectAll("g.overallG")
			.select("circle")
			.style("fill", "pink");
	}


	//modal
	d3.text("modal.html", function(data){
		d3.select("body").append("div").attr("id", "modal").html(data);
	});

	teamG.on("click", function(d){
		d3.selectAll("td.data").data(d3.values(d))
			.html(function(p) { return p;})
	});

	d3.html("book/football.svg", function(svgData){
		d3.select(svgData).selectAll("path").each(function(){
			d3.select("svg").node().appendChild(this);
		})
	});
}
