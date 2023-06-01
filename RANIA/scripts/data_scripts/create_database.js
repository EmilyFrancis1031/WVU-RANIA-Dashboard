//This function adds the directory for the device in the rania database
const build_db_path = require("../helper_scripts/build_db_path");
const check_file_exists = require("../helper_scripts/check_file_exists");
const write_to_file = require("../helper_scripts/write_to_file")
const read_file = require("../helper_scripts/read_file")
const parse_json = require("../helper_scripts/parse_json");

async function create_database(data_packet) {
  var response_code = 340;
  var path = build_db_path(data_packet["data"]["device_name"], data_packet["data"]["db_name"])

  //check if data file already exists
  var db_file_exists = await check_file_exists(path)

  if(db_file_exists){
    response_code = 342
  }
  else{
    var db_write_result = await write_to_file(path);
    if(db_write_result==15){
      var meta_data_path = build_db_path(data_packet["data"]["device_name"], "meta_data")
      var meta_data_exists = await check_file_exists(meta_data_path)
      if(meta_data_exists){
        var meta_data = await read_file(meta_data_path)
        var jsondata = parse_json(meta_data)
        if(jsondata != 10){
          jsondata[data_packet["data"]["db_name"]] = {style: data_packet["data"]["style"]}  
          var meta_data_write_result = await write_to_file(meta_data_path, jsondata)
          if(meta_data_write_result == 15){
            response_code = 341
          }
          else{
            response_code = 345
          }
        }
        else{
          response_code = 344
        }
      }
      else{
        response_code = 343
      }
    }
    else{
      response_code = 340
    } 
  }
  return response_code
}
module.exports = create_database;