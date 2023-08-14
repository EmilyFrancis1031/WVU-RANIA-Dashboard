const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists")
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function append_data(data_packet) {
  var response_code = 360;
  var path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])

  var db_file_exists = await check_file_exists(path)
  if(db_file_exists){
    var data = await read_file(path)
    json_data = parse_json(data)
    json_data["data"].push(data_packet["data"]["insert"]); // Append the object to the JSON array
    write_to_file(path, json_data)
    response_code = 361
  }
  else{
    response_code = 362
  }
  return response_code; // Return the response code
}

module.exports = append_data;
