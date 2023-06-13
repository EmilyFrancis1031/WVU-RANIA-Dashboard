//This function builds a path to a specified database
var path = require("path")
const dotenv = require("dotenv").config();
function build_db_path(device_name, db_name){
    return path.join(process.env.DB_DEVICE_ROOT_PATH, device_name, db_name+".json")
}

module.exports = build_db_path