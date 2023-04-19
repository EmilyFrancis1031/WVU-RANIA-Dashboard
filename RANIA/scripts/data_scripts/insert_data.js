//calls tiny_db insert
var TinyDB = require("tinydb");
async function insert_data(data_packet) {
  var errorcode = 301;

  data = data_packet["data"];
  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  console.log(db_path)

  db = new TinyDB(db_path);

  const dbResult = await new Promise((resolve) => {
    db.onReady = function () {
      //query access list with auth_token
      db.setInfo(data["k"], data["v"], function (err, key, value) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("[setInfo] " + key + " : " + value);
        resolve(errorcode);
      });
    };
  });

  if (dbResult == null) {
    return errorcode;
  } else {
    return dbResult;
  }

  return errorcode; //return to 01
}

module.exports = insert_data;
