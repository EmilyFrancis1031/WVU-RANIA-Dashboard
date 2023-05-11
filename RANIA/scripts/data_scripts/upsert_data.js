//calls tiny_db insert
var TinyDB = require("tinydb");
async function upsert_data(data_packet) {
  var errorcode = 301;

  path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  console.log(path);

  /*db = new TinyDB(db_path);

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
  }*/

  const Result = new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(331);
      } else {
        fs.readFile(path, (readErr, existingData) => {
          if (readErr) {
            resolve(330);
          } else {
            try {
              const jsonData = JSON.parse(existingData);
              console.log("[existingData]: ", existingData);
              Object.assign(jsonData, data_packet["data"]["insert"]);
              const updatedData = JSON.stringify(jsonData);
              console.log(updatedData);
              fs.writeFile(path, updatedData, (writeErr) => {
                if (writeErr) {
                  resolve(330);
                } else {
                  resolve(331);
                }
              });
            } catch (parseError) {
              resolve(333);
              return;
            }
          }
        });
      }
    });
  });

  return Result; //return to 01
}

module.exports = upsert_data;
