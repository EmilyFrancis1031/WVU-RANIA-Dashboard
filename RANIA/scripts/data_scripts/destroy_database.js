//remove tiny_db json file from directory
const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists")
const delete_file = require("../helper_scripts/delete_file")
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function destroy_database(data_packet) {
  var response_code = 350
  var path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])
  var db_file_exists = await check_file_exists(path)

  if(db_file_exists){
    response_code = await delete_file(path)
    var meta_data_path = build_db_path(data_packet["data"]["device_name"], "meta_data")
    var meta_data_exists = await check_file_exists(meta_data_path)
    if(meta_data_exists){
      var meta_data = await read_file(meta_data_path)
      var jsondata = parse_json(meta_data)
      delete jsondata[data_packet["data"]["db_name"]]
      var meta_data_write_result = await write_to_file(meta_data_path, jsondata)
      if(meta_data_write_result == 15){
        response_code = 351
      }
      else{
        response_code = 345
      }
    }
    else{
      response_code = 343
    }
  }
  else{
    response_code = 352
  }
  return response_code;
}
module.exports = destroy_database;