//This function adds the directory for the device in the rania database
//see npm FS package
var TinyDB = require("tinydb");
var fs = require("fs");
const { json } = require("express");
const dotenv = require("dotenv").config();

async function create_database(data_packet) {
  var errorcode = 340;

  path =
    process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +
    "/" +
    data_packet["data"]["db_name"] +
    ".json";

  //console.log(path);

  /*db = new TinyDB(db_path);
  //query ACL

  const dbResult = await new Promise((resolve) => {
    db.onReady = function (err) {
      db.setInfo("_default", {}, function (err, key, value) {
        if (err) {
          console.error(err);
          errorcode = 340;
        }
        errorcode = 341;
      });
      resolve(errorcode);
    };
  */

  const dbResult = await new Promise((resolve, reject) => {
    const data = {};
    fs.access(path, fs.constants.F_OK, (err) => {
      if (!err) {
        resolve(342);
      } else {
        const jsonString = JSON.stringify(data);
        fs.writeFile(path, jsonString, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(341);
          }
        });
      }
    });
  });

  if(dbResult == 341 && data_packet["data"]["db_name"]!="meta_data"){
    var meta_data_json = process.env.DB_DEVICE_ROOT_PATH +
    data_packet["data"]["device_name"] +"/" +"meta_data.json";
    fs.access(meta_data_json, fs.constants.F_OK, (err) => {
      if (!err) {
        resolve(342);
      } else {
        fs.readFile(meta_data_json, "utf8", (readErr, data) => {
          if (err) {
            reject(err);
            resolve(343)
          } else {
            var jsondata = JSON.parse(data)
            jsondata[data_packet["data"]["db_name"]] = {style: data_packet["data"]["style"]}
            fs.writeFile(meta_data_json, JSON.stringify(jsondata), (err) => {
              if (err) {
                reject(err);
                resolve(340)
              } else {
                resolve(341);
              }
            });
          }
          
        });
        
      }
    });
  }

  return dbResult; //return to 01
}

module.exports = create_database;
