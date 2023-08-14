export function submitCode(deviceName, alias, code){
    fetch('/data/connect-device',{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({meta_data:{
                auth_token: "01",
                sender: "Localhost",
              },
             data:{
              device_name: deviceName,
              alias: alias,
              auth_code: code
    }})
  })
      .then(response => response.json())
      .then(data=> alert(data))
  }
  
export function rejectDevice(deviceName){
fetch('/data/remove-data',{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({meta_data:{
            auth_token: "01",
            sender: "Localhost",
            },
            data:{
            device_name: "acl",
            db_name: "pending_connections",
            k: deviceName
            }})
})
    .then(response => response.json())
    .then(data=> alert(data))
}
export function populatePendingDevices(data){
const table = document.getElementById('pending-conns-table');
//console.log("[populatePendingDevices]: "+ JSON.stringify(data));
const row = table.insertRow(-1);
for (const key in data) {
    
    var aliasCell = row.insertCell(0);
    aliasCell.innerHTML=data[key].alias

    var connCodeCell = row.insertCell()
    var connCodeForm = document.createElement('input');
    connCodeForm.type = 'text'
    connCodeForm.name = 'ConnectionCode'
    connCodeCell.appendChild(connCodeForm)

    var submitCell = row.insertCell()
    var submitBtn = document.createElement('button');
    submitBtn.textContent = "Submit"
    submitBtn.classList.add('btn-accept')
    submitCell.appendChild(submitBtn);
    submitBtn.addEventListener('click', function() {
    const connCodeValue = connCodeForm.value;
    const deviceName = key
    const alias = data[key].alias
    submitCode(key, alias, connCodeValue)
    //console.log('Submitted connection code:', connCodeValue);
    // Perform any further processing with the connection code value
    });

    var rejectCell = row.insertCell()
    var rejectBtn = document.createElement('button');
    rejectBtn.textContent = "Reject"
    rejectBtn.classList.add('btn-reject')
    rejectCell.appendChild(rejectBtn);
    rejectCell.addEventListener('click', function() {
    rejectDevice(key)
    //console.log('Submitted connection code:', connCodeValue);
    // Perform any further processing with the connection code value
    });

};
};
export async function getPendingDevices(){
fetch('/data/get-data',{
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
    .then(response => response.json())
    .then(data=> populatePendingDevices(data))
}