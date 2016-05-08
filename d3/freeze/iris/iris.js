/**
 * Created by Heapzilla on 5/8/2016.
 */
var CsvData = undefined;
var Data = {};
var Labels = {
    PL: "Petal Length",
    PW: "Petal Width",
    SL: "Sepal Length",
    SW: "Sepal Width"
};

var Filter = {
    species: "",
    varX: "PL",
    varY: "PW"
}

function filterBySpecies(){

    var dataCopy = undefined;

    if(Filter.species.length != 0)
    {
        dataCopy = _
            .filter(CsvData, d=>d['Species'] === Filter.species);
    } else {
            dataCopy = CsvData;
    };

    Data = dataCopy
        .map(function(d) {
            return {
                PL: +d["Petal.Length"],
                PW: +d["Petal.Width"],
                SL: +d["Sepal.Length"],
                SW: +d["Sepal.Width"],
                species: d["Species"]
            };
        });
};

function createButtons(){
    if (d3.select("button.btn").size() >1)
        return;
    //create buttons
    var btnGenerator = ["PL", "PW", "SL", "SW"];
    btnGenerator.forEach(p1 =>{
        btnGenerator.forEach(p2 =>{
            if (p1 != p2){
                d3.select(".leftCtrl")
                    .append("button")
                    .attr({
                        class: "btn variables",
                        "data-x": p1,
                        "data-y": p2
                    })
                    .html(`${p1} ${p2}`);
            }
        })
    });

    //button click events
    d3.selectAll('.btn').on('click', function(){

        if(hasClass(this, "variables")){
            d3.selectAll('.btn.variables').classed('btn-active', false);
        } else if (hasClass(this, "species")){
            d3.selectAll('.btn.species').classed('btn-active', false);
        }
        d3.select(this).classed('btn-active', true);



        if(this.hasAttribute('data-x')){
            Filter.varX = this.getAttribute('data-x');
        }
        if(this.hasAttribute('data-y')){
            Filter.varY = this.getAttribute('data-y');
        }
        if(this.hasAttribute('data-species')){
            Filter.species = this.getAttribute('data-species');
        }
        
        loadData();
    });
}

function loadData(){
    var varX = Filter.varX;
    var varY = Filter.varY;

    var currentData = filterBySpecies();

    //set labels
    d3.select('.xLabel').html(Labels[varX]);
    d3.select('.yLabel').html(Labels[varY]);

    //x axis
    var maxX = d3.max(Data, d => d[varX]);
    var scaleX = d3.scale.linear().domain([0, maxX]).range([0,300]);
    var axisX = d3.svg.axis().scale(scaleX).orient("bottom").ticks(5);
    d3.select('g.axisX').call(axisX);

    //y axis
    var maxY = d3.max(Data, d => d[varY]);
    var scaleY = d3.scale.linear().domain([0, maxY]).range([300, 0]);
    var axisY = d3.svg.axis().scale(scaleY).orient("left").ticks(5); 
    d3.select('g.axisY').call(axisY);

    var currentData = Data
        .map(function(d) {
           return {
               X: d[varX],
               Y: d[varY],
               species: d.species
           };
    });

    //bind the current data to the circles selection
    var selection = d3.select("g.graph")
        .selectAll("circle.iris")
        .data(currentData);

    //remove missing
    selection.exit().remove();

    //new points
    selection.enter()
        .append("circle")
        .attr({
            class: "iris",
            r: 5,
            cx: function(d, i) {
                return scaleX(d.X);
            },
            cy: function(d, i) {
                return scaleY(d.Y)
            },
            fill: function(d) {
                return speciesToColor(d.species);
            },
            "opacity": .2
        });

    //update existing
    selection
        .transition()
        .attr({
            cx: function(d, i) {
                return scaleX(d.X);
            },
            cy: function(d, i) {
                return scaleY(d.Y)
            },
            fill: function(d){
                return speciesToColor(d.species);
            },
            });
}

function speciesToColor(species){
    switch (species){
        case "setosa":
            return "blue";
        case "versicolor":
            return "red";
        case "virginica":
            return "green";
    };
}

d3.csv('iris.csv', function(data) {
    CsvData = data;
    createButtons();
    //simulate click on the first button
    d3.select('.btn').node().click();
});

