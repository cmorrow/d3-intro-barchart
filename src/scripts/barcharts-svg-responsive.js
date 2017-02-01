(function() {
    var width = 0,
        barHeight = 30,
        gutter = 15,
        widthScale,
        maxVal;

    var chartData;
    var countNum = 0;
    var chart = d3.select('.chart');


    function transformData(d){
        d.value = Number(d.value); // convert to number; show breakpoint
        return d;
    }

    d3.tsv('data/barchart.tsv', transformData, function(data) {

        var bar, rects, labels;
        maxVal = d3.max(data, function(d) {
            return d.value;
        });

        // render chartData
        width = d3.select('.demo').node().
        getBoundingClientRect().width - (gutter*2);

        widthScale = d3.scale.linear()
        .domain([0, maxVal])
        .range([0, width]);

        chart.attr('height', barHeight * data.length);

        bar = chart.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function(d, i) {
                return 'translate(0,' + i * barHeight + ')'; });

        var rects = bar.append('rect')
            .attr('width', function(d){
                return widthScale(d.value);
            })
            .attr('height', barHeight - 1);

        var labels = bar.append('text')
            .attr("x", function(d) {
                return widthScale(d.value) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) {
                return d.value; 
            });

        // resize
        window.addEventListener('resize', function(){
            updateChart(data);
        });

        function updateChart(data){
            width = d3.select('.demo').node().
            getBoundingClientRect().width - (gutter*2);

            console.log('updateChart!!!' + width);
            widthScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([0, width]);

            chart.attr('height', barHeight * data.length);

            rects.attr('width', function(d){
                return widthScale(d.value);
            });

            labels.attr("x", function(d) {
                return widthScale(d.value) - 3; 
            });
        }
    });

    

    


})();
