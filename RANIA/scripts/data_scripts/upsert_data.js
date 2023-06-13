//calls tiny_db insert
const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists")
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function upsert_data(data_packet) {
  var response_code = 301;
  var path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])

  var db_file_exists = await check_file_exists(db_path)
  if(db_file_exists){
    var data = await read_file(db_path)
    json_data = parse_json(data)
    Object.assign(json_data, data_packet["data"]["insert"]);
    write_to_file(path, json_data)
  }
  return response_code; //return to 01
}

module.exports = upsert_data;
