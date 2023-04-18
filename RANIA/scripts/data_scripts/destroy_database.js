//remove tiny_db json file from directory
var fs = require("fs");
const dotenv = require("dotenv").config();

async function destroy_database(data_packet) {
  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  var result = null;

  const Result = await new Promise((resolve, reject) => {
    let result = undefined;
    try {
      fs.unlinkSync(db_path);
      result = 1;
      console.log("Deleted File successfully.");
      resolve(result);
    } catch (error) {
      result = 0;
      reject(error);
    }
  });

  if (Result == null) {
    return result;
  } else {
    return result;
  }
}

module.exports = destroy_database;
