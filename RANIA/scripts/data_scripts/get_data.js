//calls tiny_db get
const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function get_data(data_packet) {
  var response_code = 310;

  var path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])

  var db_file_exists = await check_file_exists(path)
  if(db_file_exists){
    var data = await read_file(path)
    var jsondata = parse_json(data)
    if (jsondata.hasOwnProperty(data_packet["data"]["k"])) {
      response_code = jsondata[data_packet["data"]["k"]]
    } else {
      response_code = jsondata
    }
    
  }
  else{
    response_code = 311
  }
  return response_code;
}

module.exports = get_data;
