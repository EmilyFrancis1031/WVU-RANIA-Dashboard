//calls tiny_db get
var TinyDB = require("tinydb");

async function get_data(data_packet) {
  var errorcode = 310;

  console.log("Key is: " + data_packet["data"]["k"]);

  path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  console.log(path);

  /*db = new TinyDB(db_path);

  const dbResult = await new Promise((resolve) => {
    let result = undefined;
    db.onReady = function () {
      db.getInfo(data_packet["data"]["k"], function (err, key, value) {
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
  }*/

  const Result = new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(311);
      } else {
        fs.readFile(path, (err, data) => {
          if (err) {
            resolve(310);
          } else {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (parseError) {
              resolve(310);
            }
          }
        });
      }
    });
  });

  return Result;
}

module.exports = get_data;
