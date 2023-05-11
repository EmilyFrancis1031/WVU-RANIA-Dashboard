//removes device from acl
var TinyDB = require("tinydb");
const dotenv = require("dotenv").config();

async function disconnect_device(data_packet) {
  var errorcode = 100;

  /*acl = new TinyDB("./test.db");
  //query ACL

  acl.onReady = function () {
    //query access list with auth_token
    acl.getInfo(data_packet["meta_data"], function (err, key, value) {
      //if error retreiving data
      if (err) {
        console.log(err);
        return;
      }
      //if the auth_code is correct in the ACL
      else if (value == data_packet["auth_token"]) {
        //set errorcode to success
        errorcode = 101;
      } else {
        //set errorcode
        errorcode = 102;
        //end
      }
    });
  };
  */
  const path = process.env.DB_ACL;
  const deviceName = data_packet["data"]["device_name"];

  const Result = new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        resolve(120);
      } else {
        let aclJson;
        try {
          aclJson = JSON.parse(data);
        } catch (parseError) {
          resolve(120);
        }

        if (aclJson.devices && aclJson.devices[deviceName]) {
          delete aclJson.devices[deviceName];

          fs.writeFile(path, JSON.stringify(aclJson), "utf8", (err) => {
            if (err) {
              resolve(120);
            } else {
              resolve(121);
            }
          });
        } else {
          resolve(122);
        }
      }
    });
  });

  return Result; //return to 01
}

module.exports = disconnect_device;
