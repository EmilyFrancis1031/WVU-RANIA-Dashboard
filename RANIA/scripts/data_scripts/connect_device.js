//This function adds the requesting device to the ACL on the database
//Update for proper auth methods

//Insert data_packet['auth_token'] to access_control.json
var TinyDB = require("tinydb");
const dotenv = require("dotenv").config();
const path = require('path')
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
  const acl_path = process.env.DB_ACL;
  const pending_conns_path = process.env.DB_PENDING_CONNS;

  const length = 8;
  var auth_code = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    auth_code += characters.charAt(randomIndex);
  }

  var mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: process.env.AUTH_EMAIL,
    subject: "A New Device Is Attempting To Connect To Your RANIA Hub",
    text:
      deviceToAdd.alias +
      " is attempting to connect to your RANIA hub. If you initiated this connection request please go to the 'Manage Devices' page and enter the following security code: \n\n" +
      auth_code +
      "\n\nIf you did not initiate this request, please ignore this email.",
  };

  

  const Result1 = undefined

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
    fs.access(acl_path, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error(`File does not exist at ${acl_path}`));
      } else {
        fs.readFile(acl_path, "utf8", (readErr, acl_data) => {
          if (readErr) {
            //console.log("Read Error");
            resolve(110);
          } else {
            try {
              //console.log(data);
              const jsonData = JSON.parse(acl_data);
              //console.log("[jsonData1]: ", jsonData);
              //if device name in ACL is undefined
              if (jsonData.devices[deviceToAdd.device_name] == undefined) {
                //add device to pending connections
                const Result1 = new Promise((resolve, reject) => {
                  fs.access(pending_conns_path, fs.constants.F_OK, (err) => {
                    if (err) {
                      reject(new Error(`File does not exist at ${pending_conns_path}`));
                    } else {
                      fs.readFile(pending_conns_path, "utf8", (readErr, pend_conn_data) => {
                        if (readErr) {
                          console.log("Read Error in Pending Conns");
                          resolve(110);
                        } else {
                          try {
                            //console.log(data);
                            const PCjsonData = JSON.parse(pend_conn_data);
                            console.log("[PCjsonData]: ", pend_conn_data);
                            console.log("[PCjsonData[deviceToAdd.device_name]]: ",PCjsonData[deviceToAdd.device_name])
                            //if the device id does not exist in the pending connections
                            if (PCjsonData[deviceToAdd.device_name] == undefined) {
                              //resolve(112);
                              console.log("if (PCjsonData[deviceToAdd.device_name] == undefined)")
                              PCjsonData[deviceToAdd.device_name] = {
                                alias: deviceToAdd.alias,
                                auth_code: auth_code,
                              };
                              console.log("[jsonData2]: ", PCjsonData);
                              const PCjsonupdatedData = JSON.stringify(PCjsonData);
                              console.log("[PCjsonupdatedData]: ", PCjsonupdatedData);
                              fs.writeFile(pending_conns_path,PCjsonupdatedData,(writeErr) => {
                                if (writeErr) {
                                  console.log("Write Error in Pending Conns");
                                  resolve(110);
                                } else {
                                  transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                      //console.log(error);
                                    } else {
                                      //console.log("Email sent: " + info.response);
                                    }
                                  });
                                  resolve(113);
                                }
                              });
                            }
                            else {
                              console.log("else")
                              console.log("[data_packet.data.auth_code]: ",deviceToAdd.auth_code)
                              console.log("[deviceToAdd.device_name]: ", deviceToAdd.device_name)
                              //const device_name = deviceToAdd.device_name
                              //console.log("[pend_conn_data]: ",pend_conn_data[device_name])
                              if (deviceToAdd.auth_code == PCjsonData[deviceToAdd.device_name]["auth_code"]) {
                                console.log("[Result1 Resolve 111]")
                                  jsonData.devices[deviceToAdd.device_name] = {
                                    alias: deviceToAdd.alias,
                                    status: deviceToAdd.status,
                                    auth_code: deviceToAdd.auth_code,
                                  };
                                  //console.log("[jsonData]: ", jsonData);
                                  const updatedData = JSON.stringify(jsonData);
                                  console.log("[updatedData]: ", updatedData);
                                  fs.writeFile(acl_path, updatedData, (writeErr) => {
                                    if (writeErr) {
                                      console.log("Write Error in ACL");
                                      resolve(110);
                                    } else {
                                      resolve(111);
                                    }
                                  });

                                  

                                resolve(111);

                                //create folder for device
                                const folderName = path.join(process.env.DB_DEVICE_ROOT_PATH,deviceToAdd.device_name);

                                fs.mkdir(folderName, (err) => {
                                  if (err) {
                                    console.error('Error creating folder:', err);
                                  } else {
                                    console.log('Folder created successfully.');
                                  }
                                });
                                
                                const meta_data_path = path.join(folderName, "meta_data.json")
                                fs.writeFileSync(meta_data_path, JSON.stringify({}, null, 2));

                                //remove device from pending connections
                                console.log("[ToDelete]: ",PCjsonData[deviceToAdd.device_name])
                                delete PCjsonData[deviceToAdd.device_name]
                                console.log(PCjsonData)
                                  fs.writeFile(pending_conns_path,JSON.stringify(PCjsonData),(writeErr) => {
                                    if (writeErr) {
                                      console.log("Write Error in Pending Conns");
                                      resolve(110);
                                    } else {
                                      resolve(113);
                                    }
                                  });

                              } else {
                                console.log("[Result1 Resolve 114]")
                                resolve(114);
                              }
                            }
                          } catch (parseError) {
                            console.log("Parse Error in Pending Conns");
                            resolve(110);
                          }
                        }
                      });
                    }
                  });
                });
                resolve(Result1)
                //const PendResult = Result1
                //console.log("[PendResult]: ", PendResult)
                //if(Result1 == 113){
                //  resolve(113)
                //}else {
                //resolve(112)}
                
              }
              else{
                resolve(112)
              }
            } catch (parseError) {
              console.log("Parse Error in ACL");
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
