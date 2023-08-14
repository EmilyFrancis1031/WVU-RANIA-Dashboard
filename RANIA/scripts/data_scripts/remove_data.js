//calls tiny_db remove
const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists")
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");
const delete_key_from_json = require("../helper_scripts/delete_key_from_json")
async function remove_data(data_packet) {
  var response_code = 320;

  db_path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])

  var db_file_exists = await check_file_exists(db_path)
  
  if(db_file_exists){
    var data = await read_file(db_path)
    var json_data = parse_json(data)
    if(json_data!=10){
      var new_json_data = delete_key_from_json(json_data, data_packet)
      var db_write_result = write_to_file(db_path, new_json_data)
      response_code = 321
    }
  }
  return response_code
}

module.exports = remove_data;
