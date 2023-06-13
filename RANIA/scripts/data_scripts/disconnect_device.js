//removes device from acl
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function disconnect_device(data_packet) {
  var response_code = 100;

  const path = process.env.DB_ACL;

  var data = await read_file(path)
  if(data!=21){
    var jsondata = parse_json(data)
    if(jsondata == 10){
      //error parsing acl
      response_code = 120
    }
    else{
      delete jsondata.devices[data_packet["data"]["device_name"]];
      var acl_write_result = await write_to_file(path, jsondata)
      if(acl_write_result == 15){
        response_code = 121
      }
      else{
        response_code = 120
      }
    }
  }
  return response_code; //return to 01
}

module.exports = disconnect_device;