//This function adds the requesting device to the ACL on the database
//Update for proper auth methods

//Insert data_packet['auth_token'] to access_control.json
var TinyDB = require("tinydb");
const dotenv = require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASSWORD,
  },
});

async function connect_device(data_packet) {
  var errorcode = 100;

  const deviceToAdd = data_packet["data"];
  const path = process.env.DB_ACL;

  var mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: "ef00006@mix.wvu.edu",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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


  };*/
  const Result = new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error(`File does not exist at ${path}`));
      } else {
        fs.readFile(path, "utf8", (readErr, data) => {
          if (readErr) {
            console.log("Read Error");
            resolve(110);
          } else {
            try {
              //console.log(data);
              const jsonData = JSON.parse(data);
              console.log("[jsonData]: ", jsonData);
              if (jsonData.devices[deviceToAdd.device_name]) {
                resolve(112);
              } else {
                jsonData.devices[deviceToAdd.device_name] = {
                  alias: deviceToAdd.alias,
                  status: deviceToAdd.status,
                  auth_code: deviceToAdd.auth_code,
                };
                console.log("[jsonData2]: ", jsonData);
                const updatedData = JSON.stringify(jsonData);
                console.log("[updatedData]: ", updatedData);
                fs.writeFile(path, updatedData, (writeErr) => {
                  if (writeErr) {
                    console.log("Write Error");
                    resolve(110);
                  } else {
                    resolve(111);
                  }
                });
              }
            } catch (parseError) {
              console.log("Parse Error");
              resolve(110);
            }
          }
        });
      }
    });
  });

  return Result; //return to 01
}

module.exports = connect_device;
