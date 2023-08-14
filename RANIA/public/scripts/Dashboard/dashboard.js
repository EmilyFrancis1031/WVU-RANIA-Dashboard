import {submitCode, rejectDevice, populatePendingDevices,getPendingDevices} from './handle_pending_devices.js'
import { generateTable, populateLiDARplot, populateLinearPlot} from './visualize_data.js';
import { getDatabaseData, getAvailableData, populateDevices, populateData} from './load_dashboard.js'

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  //console.log('WebSocket connection opened.');
};

ws.onmessage = event => {
  const message_data = JSON.parse(event.data);
  //console.log(message_data)
  fetch('/data/get-data',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({meta_data:{
              auth_token: "01",
              sender: "Localhost",
            },
            data:{
            device_name: message_data.data.device_name,
            db_name: message_data.data.db_name,
            }})
})
    .then(response => response.json())
    .then(data=> {
      var db = document.querySelector('[name="'+message_data.data.db_name+'"]');
      //console.log(db)
      var style = db.getAttribute('style');
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
  // Process and visualize the data here
  // For example, update a 2D or 3D visualization of the lidar data
};

window.onload = function(){
  fetch('/data/get-data', {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({meta_data:{
                            auth_token: "01",
                            sender: "Localhost",
                          },
                        data:{
                          device_name: 'acl',
                          db_name: 'pending_connections',
                        }})
              })
    .then(response1 => response1.json())
    .then(responseData1 => {
      // Process response of the first request
      populatePendingDevices(responseData1)
      // Trigger the second request
      return fetch('/data/get-data', {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({meta_data:{
                            auth_token: "01",
                            sender: "Localhost",
                          },
                        data:{
                          device_name: 'acl',
                          db_name: 'acl',
                        }})
              })
    })
    .then(response2 => response2.json())
    .then(responseData2 => {
      // Process response of the second request
      populateDevices(ws, responseData2)
      // Continue with additional logic or handle the combined result
    })
    .catch(error => {
      // Handle any errors that occur during the fetch requests
      console.error('Error:', error);
    });

}