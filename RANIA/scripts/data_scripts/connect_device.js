//This function adds the requesting device to the ACL on the database

const path = require('path')
const send_email = require('../helper_scripts/send_email')
const generate_code = require("../helper_scripts/generate_code")
const check_file_exists = require("../helper_scripts/check_file_exists")
const read_file = require("../helper_scripts/read_file")
const write_to_file = require("../helper_scripts/write_to_file")
const parse_json = require("../helper_scripts/parse_json")

async function connect_device(data_packet) {
  var response_code = 110;

  const deviceToAdd = data_packet["data"];
  const acl_path = process.env.DB_ACL;
  const pending_conns_path = process.env.DB_PENDING_CONNS;

  var auth_code = generate_code(8)

  var acl_exists = await check_file_exists(acl_path)
  if(acl_exists){
    var acl_data = await read_file(acl_path)
    var json_acl_data = parse_json(acl_data)
    if(json_acl_data.devices[deviceToAdd.device_name] == undefined){
      var pending_conns_exists = await check_file_exists(pending_conns_path)
      if(pending_conns_exists){
        var pending_conns_data = await read_file(pending_conns_path)
        var json_pending_conns_data = parse_json(pending_conns_data)
        if (json_pending_conns_data[deviceToAdd.device_name] == undefined) {
          json_pending_conns_data[deviceToAdd.device_name] = {
            alias: deviceToAdd.alias,
            auth_code: auth_code,
          };
          var pending_conns_write_result = await write_to_file(pending_conns_path, json_pending_conns_data)
          send_email("New Device Attempting to Connect to Your RANIA Hub", deviceToAdd.alias +
          "is attempting to connect to your RANIA hub."+
          "If you initiated this connection request please go to the 'Manage Devices' page and enter the following security code:\n\n"+
          auth_code+
          "\n\nIf you did not initiate this request, please ignore this email."
          )
          response_code == 113
        }
        else{
          if (deviceToAdd.auth_code == json_pending_conns_data[deviceToAdd.device_name]["auth_code"]) {
            json_acl_data.devices[deviceToAdd.device_name] = {
              alias: deviceToAdd.alias,
              status: deviceToAdd.status,
              auth_code: deviceToAdd.auth_code,
            };
            write_to_file(acl_path, json_acl_data)
            //create folder for device
            const folderName = path.join(process.env.DB_DEVICE_ROOT_PATH,deviceToAdd.device_name);

            fs.mkdir(folderName, (err) => {
              if (err) {
                console.error('Error creating folder:', err);
              } else {
                console.log('Folder created successfully.');
              }
            });
            
            const meta_data_path = path.join(folderName, "meta_data.json")
            fs.writeFileSync(meta_data_path, JSON.stringify({}, null, 2));

            //remove device from pending connections
            console.log("[ToDelete]: ",json_pending_conns_data[deviceToAdd.device_name])
            delete json_pending_conns_data[deviceToAdd.device_name]
            console.log(json_pending_conns_data)
            write_to_file(pending_conns_path, json_pending_conns_data)
            response_code == 111
          }
          else{
            response_code == 114
          }
        }

      }
    }
    else{
      response_code = 112
    } 
  }
  else{
    response_code = 115
  }
  return response_code; //return to 01
}

module.exports = connect_device;