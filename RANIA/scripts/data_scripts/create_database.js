//This function adds the directory for the device in the rania database
//see npm FS package
var TinyDB = require("tinydb");
var FS = require("fs");
const dotenv = require("dotenv").config();

async function create_database(data_packet) {
  var errorcode = 100;

  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  console.log(db_path);

  db = new TinyDB(db_path);
  //query ACL

  const dbResult = await new Promise((resolve) => {
    db.onReady = function (err) {
      db.setInfo("_default", {}, function (err, key, value) {
        if (err) {
          console.error(err);
          errorcode = 310;
        }
        errorcode = 311;
      });
      resolve(errorcode);
    };
  });

  return dbResult; //return to 01
}

module.exports = create_database;
