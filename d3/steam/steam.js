var n = 0;

function viz(){
    var xScale = d3.scale.linear().domain([1, 10]).range([20, 480]);
    var yScale = d3.scale.linear().domain([-50, 50]).range([480, 20]);
    var fillScale = d3.scale.linear().domain([0,8]).range(["yellow", "blue"]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickSize(480)
        .ticks(10);

    //the entire graph is within a group
    var _g = d3.select("svg").append("g")
        .classed("graph", true)
        .attr("transform", "translate(25,25)");

    _g.append("g").attr({id: "xAxisG"})
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("right")
        .ticks(10)
        .tickSize(480);

    _g.append("g").attr({id: "yAxisG"})
        .call(yAxis);


    d3.csv('movies.csv', function(data){

        for (var x in data[0]){
            if(x != "day") {
                var movieArea = d3.svg.area()
                    .x(function (d) {
                        return xScale(+d.day);
                    })
                    .y(function (d) {
                        return yScale(alternatingStacking(d, x, "top"));
                    })
                    .y0(function (d) {
                        return yScale(alternatingStacking(d, x, "bottom"));
                    })
                    .interpolate("basis");

                _g.insert("path", ".movie")
                    .attr("class", "movie")
                    .attr({
                        id: x + "area",
                        d: movieArea(data),
                        fill: fillScale(n),
                        stroke: "white",
                        "stroke-width": 1
                    }).style("opacity", 1);
            }
            n++;
        }


        function simpleStacking(incomingData, movieId){
            var newHeight = 0;
            for (var col in incomingData){
                if (col != "day"){
                    newHeight += +incomingData[col];
                    if (col == movieId){
                        break;
                    }
                }
            }
            return newHeight;
        }

        function alternatingStacking(incomingData, incomingAttribute, topBottom){
            var newHeight = 0;
            var skip = true;
            for (var x in incomingData) {
                if (x != "day") {
                    if (x == "movie1" || skip == false) {
                        newHeight += parseInt(incomingData[x]);
                        if (x == incomingAttribute) {
                            break;
                        }
                        if (skip == false) {
                            skip = true;
                        } else {
                            n % 2 == 0 ? skip = false : skip = true;
                        }
                    } else {
                        skip = false;
                    }
                }
            }

            if(topBottom == "bottom") {
                newHeight = -newHeight;
            }
            if (n > 1 && n%2 == 1 && topBottom == "bottom") {
                newHeight = 0;
            }
            if (n > 1 && n%2 == 0 && topBottom == "top") {
                newHeight = 0;
            }

            return newHeight;
        }
    });



}