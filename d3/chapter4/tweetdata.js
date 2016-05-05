/**
 * Created by Heapzilla on 5/5/2016.
 */

function viz() {
    var csv = d3.csv("tweetdata.csv", lineChart)
}


function lineChart(csv){
    var days = csv.map(function(d) { return d.day;});
    var tweets = csv.map(function(d) { return d.tweets;});
    var retweets = csv.map(function(d) { return d.retweets;});
    var favorites = csv.map(function(d) { return d.favorites;});

    var max = [tweets, retweets, favorites]
        .reduce(function(a, b){
            var amax = Array.maxByReduce(a);
            var bmax = Array.maxByReduce(b);
            return (amax > bmax) ? amax : bmax;
        });

    var extentX = [1,10.5];
    var extentY = [0, max];

    var xScale = d3.scale.linear().domain(extentX).range([20, 480]);
    var yScale = d3.scale.linear().domain(extentY).range([480, 20]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickSize(480)
        .tickValues(days);

    d3.select("svg")
        .append("g").attr({id: "xAxisG"})
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("right")
        .ticks(10)
        .tickSize(480);

    d3.select("svg")
        .append("g").attr({id: "yAxisG"})
        .call(yAxis);

    d3.select("svg")
        .selectAll("circle.tweets")
        .data(csv)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) { return xScale(d.day);},
            cy: function(d) { return yScale(d.tweets);},
            r: 5
        })
        .style("fill", "yellow");

    d3.select("svg")
        .selectAll("circle.retweets")
        .data(csv)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) { return xScale(d.day);},
            cy: function(d) { return yScale(d.retweets);},
            r: 5
        })
        .style("fill", "green");

    d3.select("svg")
        .selectAll("circle.retweets")
        .data(csv)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) { return xScale(d.day);},
            cy: function(d) { return yScale(d.favorites);},
            r: 5
        })
        .style("fill", "orange");

    var tweetsLine = d3.svg.line()
        .x( function(d) {
            return xScale(+d.day);
        })
        .y( function(d) {
            return yScale(+d.tweets);
        }).interpolate("basis");
    var retweetsLine = d3.svg.line()
        .x( function(d) {
            return xScale(+d.day);
        })
        .y( function(d) {
            return yScale(+d.retweets);
        }).interpolate("cardinal");
    var favoritesLine = d3.svg.line()
        .x( function(d) {
            return xScale(+d.day);
        })
        .y( function(d) {
            return yScale(+d.favorites);
        }).interpolate("step");

    d3.select("svg")
        .append("path")
        .attr("d", tweetsLine(csv))
        .attr({
            fill: "none",
            stroke: "yellow",
            "stroke-width": 2
        });
    d3.select("svg")
        .append("path")
        .attr("d", retweetsLine(csv))
        .attr({
            fill: "none",
            stroke: "green",
            "stroke-width": 2
        });
    d3.select("svg")
        .append("path")
        .attr("d", favoritesLine(csv))
        .attr({
            fill: "none",
            stroke: "orange",
            "stroke-width": 2
        });
}