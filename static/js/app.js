//calling samples.json file

async function getData() {
    const response = await fetch("./samples.json");
    data = await response.json();
    console.log(data);
    
   let dropDown = document.getElementById('selDataset');
  
  let samples= data.samples
    // console.log(samples)
  metadata= data.metadata
    // console.log(metadata)
  names= data.names
    // console.log(names)


   for (let i = 0; i < data.names.length; i++) {
    let id_names = data.names[i];
    let option = document.createElement("option");
    option.textContent = id_names;
    option.value = id_names;
    dropDown.appendChild(option);
    
  };


  dropDown.value = data.names[0];
  chartBuild(dropDown.value);
  metaBuild(dropDown.value);

}

function optionChanged(sample) { 
  chartBuild(sample);
  metaBuild(sample);
  

};

function chartBuild(sample){
  let samples = data.samples;
  let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  let new_sample= resultArray[0]
  
  let otu_labels = new_sample.otu_labels;
  let otu_ids = new_sample.otu_ids;
  let sample_values = new_sample.sample_values;   

  var topten_values = sample_values.sort((a,b) => b - a).slice(0,10).reverse();
  var top_labels = otu_labels.slice(0,10);
  var top_ids = otu_ids.slice(0,10).map(thing => `OTU ${thing}`).reverse();
  
      // Create barchart
      var barchart = [{
          x: topten_values,
          y: top_ids,
          type: "bar",
          text: top_labels,
          orientation: "h",   
      }];

      let layout1 = { 
          title: "Top Ten Samples",    
      };
    
      Plotly.newPlot("bar", barchart, layout1, {responsive: true}); 
      
      var bubble = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth",
        }
    }];

      let layout2 = {
          title: "Bacteria Per Sample",
          xaxis: {
              title: "OTU ID",
          },
      };

      Plotly.newPlot("bubble", bubble, layout2, {responsive: true});

 };

function metaBuild(sample){
  let demoPanel = document.getElementById('sample-metadata');
  let metadata = data.metadata;
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var demo_id= resultArray[0]   

  demoPanel.innerHTML = ""; 
  for(const [key, value] of Object.entries(demo_id)) {
      let h6 =  document.createElement("h6");
      demoPanel.append(h6,`${key.toUpperCase()}: ${value}`);
  };
  


  
  

  }

let data = {}

getData()






