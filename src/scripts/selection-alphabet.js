(function() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    var width = 0,
        height = 500
        gutter = 30;


    width = d3.select('.demo').node().getBoundingClientRect().width - gutter;

    var spacing = 34;
    var updateDuration = 2000;
    var transDuration = 1000;

    var vertSpacing = 80;

    var svg = d3.select(".demo").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0," + (height / 2) + ")");

    function update(data) {

        spacing = Math.floor((width/alphabet.length));

        // DATA JOIN
        // Join new data with old elements, if any.
        var text = svg.selectAll("text")
            .data(data, function(d) {
                return d; });

        // UPDATE
        // Update old elements as needed.
        text.attr("class", "update")
            .transition()
            .duration(transDuration)
            .style('font-size', '38px')
            .attr("y", 0)
            .attr("x", function(d, i) {
                return i * spacing;
            });

        // ENTER
        // Create new elements as needed.
        text.enter().append("text")
            .attr("class", "enter")
            .attr("dy", ".35em")
            .attr("y", -1 * vertSpacing) // default y value
            .attr("x", function(d, i) {
                return i * spacing; })
            .style("fill-opacity", 1e-6)
            .text(function(d) {
                return d;
            })
            .transition()
            .duration(transDuration)
            .attr("y", 0)
            .style("fill-opacity", 1);

        // EXIT
        // Remove old elements as needed.
        text.exit()
            .attr("class", "exit")
            .transition()
            .duration(transDuration)
            .attr("y", function() {
                return vertSpacing;
            })
            .remove();
    }

    // The initial display.
    update(alphabet);

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    setInterval(function() {
        update(d3.shuffle(alphabet)
            .slice(0, Math.floor(Math.random() * 26))
            .sort());
    }, updateDuration);

})();
