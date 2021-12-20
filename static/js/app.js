//calling from samples.json and appending data to option
d3.json('samples.json').then(({names}) =>{
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });
    showCharts();
});

function optionChanged() {
    showCharts();
};
//On Select filter for the Demo infor we want. 
function showCharts() {
    let sel = d3.select('select').node().value
    d3.json('samples.json').then(({metadata,samples})=>{
        let meta = metadata.filter(obj=>obj.id == sel)[0];
        let sample = samples.filter(obj=>obj.id == sel)[0];
        console.log(meta);
// Make sure to clear Demograhic info panel before selecting new Subject ID
        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,value])=>{
            d3.select('.panel-body').append('h4').text(key.toUpperCase()+': '+value)
        })

        //Horizontal bar
        var data = [
            {
              x: sample.otu_ids,
              y: [20, 14, 23],
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);
          
        //Gauge Chart
          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 450,
              title: { text: "Speed" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 500] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);
          


          //Bubble Chart
          var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
              size: [40, 60, 80, 100]
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('myDiv', data, layout);


    });
};

