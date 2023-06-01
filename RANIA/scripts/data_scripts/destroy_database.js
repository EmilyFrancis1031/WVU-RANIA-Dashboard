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
        resolve(353);
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            resolve(351);
          } else {
            resolve(350);
          }
        });
      }
    });
  });

  if(Result == 350){
    var meta_data_json = process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +"/" +"meta_data.json";
    console.log("[meta_data_json]: ", meta_data_json)
    fs.access(meta_data_json, fs.constants.F_OK, (err) => {
      if (err) {
        Result ==351;
        // console.log("[1]")
      } else {
        fs.readFile(meta_data_json, "utf8", (readErr, data) => {
          if (err) {
            Result == 351
            // console.log("[2]")
          } else {
            // console.log("[3]")
            console.log("[read metadata]")
            var jsondata = JSON.parse(data)
            console.log(data_packet["data"]["device_name"])
            delete jsondata[data_packet["data"]["db_name"]]
            console.log("[jsondata] :", jsondata)
            fs.writeFile(meta_data_json, JSON.stringify(jsondata), (err) => {
              if (err) {
                Result == 351
                // console.log("[4]")
              } else {
                Result == 350
                // console.log("[5]")
              }
            });
          }
          
        });
        
      }
    });
  }

  return Result;
}

module.exports = destroy_database;
