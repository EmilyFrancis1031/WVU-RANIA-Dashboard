//remove tiny_db json file from directory
var fs = require("fs");
const dotenv = require("dotenv").config();

async function destroy_database(data_packet) {
  path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  const Result = await new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(345);
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(344);
          }
        });
      }
    });
  });

  return Result;
}

module.exports = destroy_database;
