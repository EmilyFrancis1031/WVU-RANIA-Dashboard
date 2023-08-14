function rejectDevice(deviceName){
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