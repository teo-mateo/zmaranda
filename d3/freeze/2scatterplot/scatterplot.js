/**
 * Created by Heapzilla on 5/1/2016.
 */


function scatterplot(){
    d3.csv("friends.csv", load);
}

function load(scatterData){

    var _svg = d3.select("svg");

    var xExtent = d3.extent(scatterData, function(d) {
        return +d.salary;
    });
    var yExtent = d3.extent(scatterData, function(d) {
        return +d.friends;
    });

    var xScale = d3.scale.linear().domain(xExtent).range([0, 500]);
    var yScale = d3.scale.linear().domain(yExtent).range([0, 500]);

    _svg
        .selectAll("circle")
        .data(scatterData).enter().append("circle")
        .attr({
            r: 5,
            cx: function(d) {
                return xScale(d.salary);
            },
            cy: function(d) {
                return yScale(d.friends);
            }
        });

    var yAxis = d3.svg.axis().scale(yScale).orient("right").ticks(14).tickSize(500);
    _svg.append("g").attr("id", "yAxisG").call(yAxis);
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(4).tickSize(500);
    _svg.append("g").attr("id", "xAxisG").call(xAxis);
}
