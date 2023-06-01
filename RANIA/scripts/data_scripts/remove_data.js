//calls tiny_db remove
var TinyDB = require("tinydb");
async function remove_data(data_packet) {
  var result = 310;

  db_path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";
  console.log("[db_path]: ", db_path)
  /*db = new TinyDB(db_path);

  const dbResult = await new Promise((resolve) => {
    let result = undefined;
    db.onReady = function () {
      db.findByIdAndRemove(
        data_packet["data"]["k"],
        function (err, key, value) {
          if (err) {
            console.error(err);
            errorcode = 310;
          }

          result = { data: value };
          resolve(result);
        }
      );
    };
  });*/

  // const resultPromise = new Promise(db.onReady)

  // resultPromise
  // .then(console.log("[promise_accepted]",result))
  // .catch(console.log("[promise_rejected]: ",result))

  //console.log("[get_data]: ", dbResult);
  //return to 01
  /*if (dbResult == null) {
    return errorcode;
  } else {
    return dbResult;
  }*/
  const jsonData = JSON.parse(fs.readFileSync(db_path, 'utf8'));
  console.log('[jsonData]: ', jsonData)
  // Check if the searchKey exists in the JSON data
  if (jsonData.hasOwnProperty(data_packet["data"]["k"])) {
    // Delete the key from the JSON data
    delete jsonData[data_packet["data"]["k"]];

    // Write the updated JSON back to the file
    fs.writeFileSync(db_path, JSON.stringify(jsonData, null, 2));

    console.log(`Key "${data_packet["data"]["k"]}" deleted successfully from ${db_path}.`);
    result = 301
  } else {
    console.log(`Key "${data_packet["data"]["k"]}" not found in ${db_path}. No changes made.`);
  }


}

module.exports = remove_data;
