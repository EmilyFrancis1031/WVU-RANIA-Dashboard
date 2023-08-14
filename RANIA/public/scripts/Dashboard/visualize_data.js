export function generateTable(jsonData){
    const table = document.createElement('table');
    //table.setAttribute('id', tableId);
    const keys = Object.keys(jsonData);
  
    // Create table data rows
    
    for (let i = 0; i < keys.length; i++) {
      const dataRow = table.insertRow(-1);
      //const dataCell = document.createElement('td');
      const rowData = jsonData[keys[i]]
      //console.log("[RowData]: ",rowData)
      const rowDataKeys = Object.keys(rowData)
      for(let j = 0; j < rowDataKeys.length; j++){
          const dataCell = document.createElement('td');
          dataCell.textContent = jsonData[keys[i]][rowDataKeys[j]];
          dataRow.appendChild(dataCell);
      }
      //dataCell.textContent = `${jsonData[keys[i]].name} (${jsonData[keys[i]].time})`;
      //dataRow.appendChild(dataCell);
    }
  
    return table.outerHTML;
  }

function polarToCartesian(degrees, distance) {
  const radians = (degrees - 90) * (Math.PI / 180); // Convert degrees to radians
  const x = distance * Math.cos(radians);
  const y = distance * Math.sin(radians);
  return { x, y };
}

export function populateLiDARplot(newData){
    console.log("populateLiDARplot")
 
    // Create a div element to contain the scatterplot
    // Select the existing scatterplot container
    var scatterplotContainer = document.getElementById("scatterplot-container");
    if (scatterplotContainer) {
      // The scatterplot container element exists
      // Perform your action here
      d3.select(scatterplotContainer).select("svg").remove();
      scatterplotContainer = document.createElement("div");
      scatterplotContainer.id = "scatterplot-container";
      document.getElementById("data-area").appendChild(scatterplotContainer);
  } else {
      // The scatterplot container element does not exist
      // You can handle this case if needed
      scatterplotContainer = document.createElement("div");
      scatterplotContainer.id = "scatterplot-container";
      document.getElementById("data-area").appendChild(scatterplotContainer);

  }

    /// Set up SVG dimensions
    const svgWidth = 450;
    const svgHeight = 450;

    // Add padding to the SVG dimensions
const padding = 50;
const paddedWidth = svgWidth + 2 * padding;
const paddedHeight = svgHeight + 2 * padding;
  
    // Create an SVG element
    const svg = d3.select("#scatterplot-container")
        .append("svg")
        .attr("width", paddedWidth)
        .attr("height", paddedHeight)
        .style("background-color", "#f7f7f7"); // Change the background color here

        // Calculate center coordinates with padding
const centerX = paddedWidth / 2;
const centerY = paddedHeight / 2;
  
        // Move the scatterplotGroup to the center with padding
const scatterplotGroup = svg.append("g")
.attr("transform", `translate(${centerX},${centerY})`);
  
        // Create a red circle at the center
        scatterplotGroup.append("circle")
        .attr("cx", 0) // Center x-coordinate
        .attr("cy", 0) // Center y-coordinate
        .attr("r", 3) // Adjust the radius as needed
        .style("fill", "red");
            // Create circles for data points within the centered group\
            scatterplotGroup.selectAll("circle.data-point")
            .data(newData)
            .enter()
            .append("circle")
            .attr("class", "data-point")
            .attr("cx", d => polarToCartesian(d.degrees, d.distance).x)
            .attr("cy", d => -polarToCartesian(d.degrees, d.distance).y) // Negative y to invert
            .attr("r", 2) // Adjust the radius as needed
            .attr("fill", d => d.color)

            // Set up scales for degrees and distance
      const degreesScale = d3.scaleLinear()
      .domain([0, 360])
      .range([0, svgWidth / 2]);

      const distanceScale = d3.scaleLinear()
      .domain([0, 70]) // Adjust the domain to match your data
      .range([0, svgHeight / 2]);

      // Create circles for measurement rings and labels
      for (let distance = 10; distance <= 70; distance += 10) {
        scatterplotGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", distanceScale(distance))
            .attr("fill", "none")
            .attr("stroke", "lightgray")
            .attr("stroke-dasharray", "2,2");

        scatterplotGroup.append("text")
            .attr("x", 0)
            .attr("y", -distanceScale(distance))
            .attr("dy", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .text(distance);
      }

      for (let degree = 0; degree <= 330; degree += 30) {
        const outerRadius = distanceScale(70) + 15; // Position outside distance-60 ring
        const pos = polarToCartesian(degree, outerRadius);
        scatterplotGroup.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", pos.x)
        .attr("y2", -pos.y)
        .attr("stroke", "lightgray")
        .attr("stroke-dasharray", "2,2");
        scatterplotGroup.append("text")
            .attr("x", pos.x)
            .attr("y", -pos.y)
            .attr("dy", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .text(degree + "°");
    }
  }

  export function populateLinearPlot(data) {
    
    // Parse the date strings to Date objects
    data.forEach(d => {
        d.x = new Date(d.x);
        d.value = +d.value; // Convert value to a number
    });

    var linearplotContainer = document.getElementById("linearplot");

    if (linearplotContainer) {
        d3.select(linearplotContainer).select("svg").remove();
    } else {
        linearplotContainer = document.createElement("div");
        linearplotContainer.id = "linearplot";
        document.getElementById("data-area").appendChild(linearplotContainer);
    }

    // Set up SVG dimensions
    const svgWidth = 500;
    const svgHeight = 300;
    const padding = 50;

    // Set up the SVG dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.select("#linearplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "transparent")
        .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log(data)

    // Create scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.x))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    // Create line generator
    const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.value));

    // Append the line
    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);

    // Append x-axis
    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    // Append y-axis
    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

    // Add labels and title if needed
}
