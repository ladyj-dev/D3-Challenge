// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100,
};
// use console.log to verify code step by step
var width = svgWidth - margin.left - margin.right;
console.log(`Width: ${width}`);
var height = svgHeight - margin.top - margin.bottom;
console.log(`Height: ${height}`);
// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("class", "chart");


  /*// Initial Params
var chosenXAxis = "hair_length";

// function used for updating x-scale var upon click on axis label
function xScale(hairData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
      d3.max(hairData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "hair_length") {
    label = "Hair Length:";
  }
  else {
    label = "# of Albums:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

  */

// Step 3:
// Import data from the donuts.csv file
// use + to indicate that age and healthcare are numbers
// =================================
d3.csv("./assets/data/data.csv").then(function (data) {
    console.log(data);

    data.forEach(function(data){
    data.age = +data.age;
    data.healthcare = +data.healthcare;
 });
    
  // Step 5: Create the scales for the chart
  // =================================
  var xLinearScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.age))
    .range([0, width]);
  // // Step 6: Set up the y-axis domain
  var yLinearScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.healthcare))
    .range([height, 0]);

  // create axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //   append axes to chartgroup
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);


  // Create axes labels
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Healthcare");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Age");

  // create circles (use class from css'state circle')
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xLinearScale(d.age))
    .attr("cy", (d) => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("class", "stateCircle");

    var textGroup = chartGroup
    .append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => xLinearScale(d.age)-0.5)
    .attr("y", (d) => yLinearScale(d.healthcare)+5)
    .attr("class", "stateText")
    .html(function (d) {
      return `${d.abbr}`
    });

  
  // using version 9 of d3 tips (html) d3 tips class in css
  // step 10 intialize tool tip
  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(function (d) {
      return `${d.state}<br>Age: ${d.age}<br> Without Healthcare: ${d.healthcare}`;
    });
  // step 11 create tooltip chart; append
  chartGroup.call(toolTip);

  // create event listener (when we click on circle we want it to take tool tip and show)
  circlesGroup
    .on("click", function (data) {
      toolTip.show(data, this);
    })
    // on mouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    
    });
});
