function barchart1() {
    //var data = [11, 21, 9, 67, 89, 100];
	var data = [14, 1650, 24500, 430, 19, 1000, 5555];
    

    
	d3.csv("book/cities.csv", function (err, data) {
		generate(data)
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
        .domain([0, 13000000])
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
                    return svg_h - yscale(d.population);
                },
				width: 30, 
				height: function(d) { 
                    return yscale(d.population);
                }
			})
			.style({
				fill: "#3300cc",
				opacity: 0.25, 
				stroke: "red", 
				"stroke-width": "1px"
			});
}