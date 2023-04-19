//calls tiny_db get
var TinyDB = require("tinydb");

async function get_data(data_packet) {
  var errorcode = 310;

  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    "_data.json";

  db = new TinyDB(db_path);

  const dbResult = await new Promise((resolve) => {
    let result = undefined;
    db.onReady = function () {
      db.getInfo("_default", function (err, key, value) {
        if (err) {
          console.error(err);
          errorcode = 310;
        }

        result = { data: value };
        resolve(result);
      });
    };
  });

  // const resultPromise = new Promise(db.onReady)

  // resultPromise
  // .then(console.log("[promise_accepted]",result))
  // .catch(console.log("[promise_rejected]: ",result))

  console.log("[get_data]: ", dbResult);
  //return to 01
  if (dbResult == null) {
    return errorcode;
  } else {
    return dbResult;
  }
}

module.exports = get_data;
