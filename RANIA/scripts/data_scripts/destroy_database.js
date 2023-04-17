//remove tiny_db json file from directory
var fs = require("fs");
const dotenv = require("dotenv").config();

async function destroy_database(data_packet) {
  const to_remove = data_packet["data"]["to_remove"];
  db_path = process.env.DB_DEVICE_ROOT_PATH + to_remove;
  try {
    fs.unlinkSync(db_path);

    console.log("Delete File successfully.");
  } catch (error) {
    console.log(error);
  }
}

module.exports = destroy_database;
