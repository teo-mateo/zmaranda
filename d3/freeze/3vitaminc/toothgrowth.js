/**
 * Created by Teodor B on 5/1/2016.
 */

var _PARA = {
    G_W: 400,
    G_H: 400,
    RADIUS: 5,
    X_SCALE: undefined,
    Y_SCALE: undefined,
};

var xScale = undefined;
var yScale = undefined;
var yScaleNormal = undefined;

function generateScales(data){
    //extents for the two dimensions; dose and tooth len
    var doseExt = d3.extent(data, function(d) { return +d.dose;});
    doseExt[0] = .4;
    doseExt[1] = doseExt[1] + 0.1;
    var lenExt = d3.extent(data, function(d) {return +d.len;});
    lenExt[0] = 0;
    lenExt[1] += 4;

    //scales for the two dimensions
    yScale = d3.scale.linear().domain(lenExt).range([_PARA.G_H, 0]);
    yScaleNormal = d3.scale.linear().domain(lenExt).range([0, _PARA.G_H]);
    xScale = d3.scale.linear().domain(doseExt).range([0, _PARA.G_W]);
}

function toothgrowth(url){
    d3.csv(url, function(data){
        // dose - numeric
        // len - numeric
        // supp - "VC"/"OJ" - vitamin c vs orange juice
        generateScales(data);
        generateScatterPlot(data);
        generateAllBoxPlots(data);
    })
}

function generateAxis(svg){
    //axis for the two dimensions
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4).tickSize(_PARA.G_H);
    var yAxis = d3.svg.axis().orient("right").scale(yScale).tickSize(_PARA.G_W);

    //the entire graph is within a group
    var _g = svg.append("g")
        .classed("graph", true)
        .attr("transform", "translate(50,50)");
    //appending axes
    _g.append("g").call(yAxis).classed("yax", true);
    _g.append("g").call(xAxis).classed("xax", true);


    //title
    svg.append("text")
        .html("The Effect of Vitamin C on Tooth Growth in Guinea Pigs")
        .attr({
            class: "title",
            transform: "translate(10, 20)"
        });

    svg.append("text")
        .html("Dosage (mg)")
        .attr({
            class: "labelx",
            transform: "translate(50, " + (80 + _PARA.G_H) + ")"
        });
    svg.append("text")
        .html("Length (mm)")
        .attr({
            class: "labely",
            transform: "translate("+(75 + _PARA.G_W)+", 50)rotate(90)"
        });

    //legend
    svg.append("g")
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

    svg.select("g.legend").selectAll("g")
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

    return _g;
}

function generateScatterPlot(scatterData){
    var svg = d3.select("svg#scatterSVG");
    var g = generateAxis(svg);

    //generating plots
    g.selectAll("circle.pt")
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
}

function generateAllBoxPlots(scatterData){
    var svg = d3.select("svg#boxplotSVG");
    var graph = generateAxis(svg);
    
    var vc_05mg = scatterData.filter(function(d) { return +d.dose == 0.5 && d.supp =="VC";});
    generateBoxPlot(graph, vc_05mg, 0.5, "VC");

    var vc_1mg = scatterData.filter(function(d) { return +d.dose == 1.0 && d.supp =="VC";});
    generateBoxPlot(graph, vc_1mg, 1, "VC");

    var vc_1p5mg = scatterData.filter(function(d) { return +d.dose == 1.5 && d.supp =="VC";});
    generateBoxPlot(graph, vc_1p5mg, 1.5, "VC");

    var vc_2mg = scatterData.filter(function(d) { return +d.dose == 2 && d.supp =="VC";});
    generateBoxPlot(graph, vc_2mg, 2, "VC");

    var oj_05mg = scatterData.filter(function(d) { return +d.dose == 0.5 && d.supp =="OJ";});
    generateBoxPlot(graph, oj_05mg, 0.5, "OJ");

    var oj_1mg = scatterData.filter(function(d) { return +d.dose == 1.0 && d.supp =="OJ";});
    generateBoxPlot(graph, oj_1mg, 1, "OJ");

    var oj_1p5mg = scatterData.filter(function(d) { return +d.dose == 1.5 && d.supp =="OJ";});
    generateBoxPlot(graph, oj_1p5mg, 1.5, "OJ");

    var oj_2mg = scatterData.filter(function(d) { return +d.dose == 2 && d.supp =="OJ";});
    generateBoxPlot(graph, oj_2mg, 2, "OJ");
}

/**
 *
 * @param svg - the svg
 * @param data - filtered data (all population) for the dosage and type of administration
 * @param dose - dosage
 * @param type - type of administration (VC vitamin C) / (OJ orange juice)
 */
function generateBoxPlot(graph, data, dose, type){
    var toothlengths = data.map(function(d) { return +d.len;});
    toothlengths = toothlengths.sort(d3.ascending);
    var median = d3.median(toothlengths);
    var min = d3.min(toothlengths);
    var q1 = d3.quantile(toothlengths, 0.25);
    var q3 = d3.quantile(toothlengths, 0.75);
    var max = d3.max(toothlengths);

    var g = graph.append("g")
        .attr({
            class: "box",
            transform: function(d, i){
                var x = xScale(dose) + (type == "VC" ? (-10) : (10));
                var y = yScale(median);
                return "translate(" + x + ", " + y + ")";
            }
        });
    g.append("rect")
        .attr({
            class: "rectBox" + type,
            width: 10,
            height: yScaleNormal(q3-q1),
            x: -5,
            y: -yScaleNormal((q3-q1)/2),
            "data": "[" + min + " " + q1 + " " + median + " " + q3 + " " + max + "]"
        });

    g.append("line")
        .attr({
           class: "median",
            x1: -5, x2: 5,
            y1: 0, y2: 0
        });

    g.append("line")
        .attr({
            class: "whiskers",
            x1: 0,
            x2: 0,
            y1: -yScaleNormal((q3-q1)/2),
            y2: -yScaleNormal(max-median)
        });

    g.append("line")
         .attr({
             class: "whiskers",
             x1: 0,
             x2: 0,
             y1: yScaleNormal((q3-q1)/2),
             y2: yScaleNormal(median-min)
         });

    g.append("line")
        .attr({
            data: "end1",
            class:"whiskers",
            x1: -5, x2: 5,
            y1: -yScaleNormal(max-median),
            y2: -yScaleNormal(max-median)
        });

    g.append("line")
        .attr({
            data: "end1",
            class:"whiskers",
            x1: -5, x2: 5,
            y1: yScaleNormal(median-min),
            y2: yScaleNormal(median-min)
        });
}