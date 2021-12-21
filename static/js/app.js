//calling samples.json file

async function getData() {
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);
}

const id = Object.values(data.id)
const eth = Object.values(data.ethnicity)
const age = Object.values(data.age)
const gender = Object.values(data.gender)
const location = Object.values(data.location)
const bbtype = Object.values(data.bbtype)
const wfreq = Object.values(data.wfreq)

// document.querySelector("#selDataset").addEventListener("select", event => {
//     }):

let dropDown = document.getElementById("selDataset")
let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Text Subject ID';

// Show charts when option is selected in dropdown
function optionChanged() {
    showCharts();
};
//On Select, filter for the Demographic infomation we want. 
function showCharts() {
    let sel = d3.select('select').node().value
    d3.json('samples.json').then(({metadata,samples})=>{
        let meta = metadata.filter(obj=>obj.id == sel)[0];
        let sample = samples.filter(obj=>obj.id == sel)[0];
        console.log(meta);



         // Horizontal bar
         var data = [
            {
              x: sample.otu_ids,
              y: [20, 14, 23],
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);
        var trace1 = {
            x: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
            y: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
            type: 'bar',
            text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
            marker: {
              color: 'rgb(142,124,195)'
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Number of Graphs Made this Week',
            font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: false,
              gridwidth: 2
            },
            bargap :0.05
          };
          
          Plotly.newPlot('myDiv', data, layout);
          
        //Gauge Chart
        var data = [
            {
              type: "indicator",
              mode: "gauge+number+delta",
              value: 420,
              title: { text: "Weekly Washing Freq. By Individual", font: { size: 24 } },
              delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
              gauge: {
                axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 250], color: "cyan" },
                  { range: [250, 400], color: "royalblue" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
          };
          
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
          
          Plotly.newPlot('bubble', data, layout);


    });
};