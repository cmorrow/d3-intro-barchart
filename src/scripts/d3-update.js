(function() {
  var width = 960,
    height = 500;

  var data = [0, 1, 3];
  var x = d3.scale.ordinal()
    .domain(data)
    .rangePoints([0, width], 1);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var circle = svg.selectAll("circle")
    .data([0, 1])
    .enter().append("circle")
    .attr("r", height / 4)
    .attr("cx", x)
    .attr("cy", height / 2);

  setTimeout(function() {
    data = [2, 1];
    x = d3.scale.ordinal()
    .domain(data)
    .rangePoints([0, width], 1);
    circle = circle.data(data, function(d) {
      return d;
    });

    // Since this is created before enter.append, it only applies to updating nodes.
    updateViz([3,1]);

    // second update
    setTimeout(function() {
      updateViz([1, 3]);

    }, 1500);

  }, 1000);

  function updateViz(data) {


    circle.data(data, function(d) {
      return d;
    });
    

    circle.transition()
      .duration(750)
      .attr("cx", x)
      .attr("r", height / 3)
      .style("fill", "orange");

      circle.enter().append("circle")
      .attr("r", height / 4)
      .attr("cx", x)
      .attr("cy", height / 2)
      .style("fill", "green");

    circle.exit().transition()
      .duration(500)
      .delay(500)
      .style("fill", "red")
      .transition()
      .duration(5000)
      .attr("r", 1e-6)
      .remove();
  }



})();
