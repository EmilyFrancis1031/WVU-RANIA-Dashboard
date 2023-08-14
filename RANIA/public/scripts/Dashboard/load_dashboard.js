import { generateTable, populateLiDARplot, populateLinearPlot } from "./visualize_data.js"

export function getDatabaseData(device, db, style){
//console.log("[getDataBaseData]", device, db, style)
// const style = data.style

fetch('/data/get-data',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({meta_data:{
            auth_token: "01",
            sender: "Localhost",
            },
            data:{
            device_name: device,
            db_name: db,
            }})
})
    .then(response => response.json())
    .then(data=> {
    var result = undefined

    switch (style) {
        case "table":
          result = generateTable(data);
          document.getElementById("data-area").innerHTML = result;
          break;
        
        case "lidar":
          populateLiDARplot(data.data);
          break;

        case "linear":
          populateLinearPlot(data.data);
          break;
        
        default:
          console.log("Unhandled data style");
          document.getElementById("data-area").innerHTML = "Unhandled data style";
          break;
      }
    
    })

}

export function getAvailableData(ws, key){
    fetch('/data/get-data',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({meta_data:{
            auth_token: "01",
            sender: "Localhost",
            },
            data:{
            device_name: key,
            db_name: 'meta_data',
            }})
})
    .then(response => response.json())
    .then(data=> populateData(ws, key, data))
}

export function populateDevices(ws,data){
    
const table = document.getElementById('devices-table');
//console.log("[populateDevices]: "+ JSON.stringify(data));
const devices = data['devices']
const row = table.insertRow(-1);
for (const key in devices) {
    //console.log(key)
    const deviceCell = row.insertCell(0);
    const button = document.createElement('button');
    button.textContent = devices[key]['alias'];
    button.classList.add('btn');
    button.onclick = function() {
    document.getElementById("data-area").innerHTML = ""
    getAvailableData(ws, key);
    const label = document.getElementById('device-label')
    label.innerHTML = devices[key].alias
    };
    deviceCell.appendChild(button);
};
}

function updateActiveDevice(ws, message) {
  ws.send(message);
}


export function populateData(ws, device, data){
//console.log("[populateData: ]"+JSON.stringify(data))
const row = document.getElementById('available-data-table');
row.innerHTML = ""
for (const key in data) {
    const deviceCell = row.insertCell(0);
    const button = document.createElement('button');
    button.textContent = key;
    button.setAttribute("name", key)
    button.setAttribute("style", data[key].style);
    button.classList.add('btn2')
    button.onclick = function() {
    updateActiveDevice(ws, key)
    getDatabaseData(device, key, data[key].style)
    };
    deviceCell.appendChild(button);
};
}