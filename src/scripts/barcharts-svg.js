(function() {
    var width = 0,
        barHeight = 30,
        gutter = 15,
        widthScale,
        maxVal;

        var chartData;
    var chart = d3.select('.chart')
        .attr("width", width);

    d3.tsv('data/barchart.tsv', transformData, function(data) {
        width = d3.select('.demo').node().getBoundingClientRect().width - (gutter*2);
        maxVal = d3.max(data, function(d) {
            return d.value;
        });

        widthScale = d3.scale.linear()
        .domain([0, maxVal])
        .range([0, width]);

        chart.attr('height', barHeight * data.length);

        var bar = chart.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function(d, i) {
                return 'translate(0,' + i * barHeight + ')'; });

        bar.append('rect')
            .attr('width', function(d){
                return widthScale(d.value);
            })
            .attr('height', barHeight - 1);

        bar.append('text')
            .attr("x", function(d) {
                return widthScale(d.value) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) {
                return d.value; 
            });
    });

    function transformData(d){
        d.value = Number(d.value); // convert to number; show breakpoint
        return d;
    }

    d3.tsv('data/barchart.tsv', transformData, function(data) {
        chartData = data;
        updateChart(data);
    });

    var updateChart = function(data){
        console.log('updateChart!!!');
        if(data){
            width = d3.select('.demo').node().getBoundingClientRect().width - (gutter*2);
            maxVal = d3.max(data, function(d) {
                return d.value;
            });

            widthScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([0, width]);

            chart.attr('height', barHeight * data.length);

            var bar = chart.selectAll('g')
                .data(data)
                .enter().append('g')
                .attr('transform', function(d, i) {
                    return 'translate(0,' + i * barHeight + ')'; });

            bar.append('rect')
                .attr('width', function(d){
                    return widthScale(d.value);
                })
                .attr('height', barHeight - 1);

            bar.append('text')
                .attr("x", function(d) {
                    return widthScale(d.value) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function(d) {
                    return d.value; 
                });
        }
        
    }


})();
