/**
 * Created by Teodor B on 5/1/2016.
 */

var _PARA = {
    G_W: 400,
    G_H: 400,
    RADIUS: 5
}

function toothgrowth(url){
    d3.csv(url, function(data){
        // dose - numeric
        // len - numeric
        // supp - "VC"/"OJ" - vitamin c vs orange juice
        loadData(data);
    })
}

function loadData(scatterData){
    var _svg = d3.select("svg");

    //extents for the two dimensions; dose and tooth len
    var doseExt = d3.extent(scatterData, function(d) { return +d.dose;});
    doseExt[0] = .4;
    doseExt[1] = doseExt[1] + 0.1;
    var lenExt = d3.extent(scatterData, function(d) {return +d.len;});
    lenExt[0] -= 2;
    lenExt[1] += 4;

    //scales for the two dimensions
    var yScale = d3.scale.linear().domain(lenExt).range([_PARA.G_H, 0]);
    var xScale = d3.scale.linear().domain(doseExt).range([0, _PARA.G_W]);

    //axis for the two dimensions

    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4).tickSize(_PARA.G_H);
    var yAxis = d3.svg.axis().orient("right").scale(yScale).tickSize(_PARA.G_W);

    //the entire graph is within a group
    var _g = _svg.append("g")
        .classed("graph", true)
        .attr("transform", "translate(50,50)");
    
    //appending axes
    _g.append("g").call(yAxis).classed("yax", true);
    _g.append("g").call(xAxis).classed("xax", true);

    //generating plots
    _g.selectAll("circle.pt")
        .data(scatterData)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) {
                return xScale(d.dose);
            },
            cy: function(d) { return yScale(d.len);},
            r: _PARA.RADIUS,
            class: function(d) { return (d.supp == "VC") ? "ptVC" : "ptOJ";}
        });

    //title
    _svg.append("text")
        .html("The Effect of Vitamin C on Tooth Growth in Guinea Pigs")
        .attr({
            class: "title",
            transform: "translate(10, 20)"
        });
    
    _svg.append("text")
        .html("Dosage (mg)")
        .attr({
            class: "labelx",
            transform: "translate(50, " + (80 + _PARA.G_H) + ")"
        });
    _svg.append("text")
        .html("Length (mm)")
        .attr({
            class: "labely",
            transform: "translate("+(75 + _PARA.G_W)+", 50)rotate(90)"
        });

    //legend
    _svg.append("g")
        .attr({
            class: "legend",
            transform: "translate(" + (_PARA.G_W + 100) + ", 50)",
        });

    var legendData = [{
        class: "ptVC",
        label: "Vitamin C"
    }, {
        class: "ptOJ",
        label: "Orange Juice"
    }];

    _svg.select("g.legend").selectAll("g")
        .data(legendData)
        .enter()
        .append("g")
        .attr({
            class: function(d) { return d.class;},
            transform: function(d,i) { return "translate(0, " + (i*20) + ")"}
        }).each(function(d,i){
            d3.select(this).append("circle")
                .classed(d.class, true)
                .attr({
                    r: _PARA.RADIUS,
                    transform: "translate(13, -5)"
                });
            d3.select(this).append("text").html(d.label).attr("transform", "translate(20,0)");
    });

}