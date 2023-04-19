//calls tiny_db update
var TinyDB = require("tinydb");
async function update_data(data_packet) {
  var errorcode = 320;

  data = data_packet["data"];

  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["db"] +
    "/" +
    data_packet["data"]["db"] +
    ".json";

  db = new TinyDB(db_path);
  //query ACL

  const dbResult = await new Promise((resolve) => {
    db.onReady = function () {
      //query access list with auth_token
      db.setInfo(data["k"], data["v"], function (err, key, value) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("[setInfo] " + key + " : " + value);
        errorcode = resolve(result);
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

module.exports = update_data;
