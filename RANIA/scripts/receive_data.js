//This function is called by the route that receives all requests from devices
//It verifies the data is in a correct format, authenticates that the request is from a valid source, and executes the request command
//A status code and message is returned to sender

//include message_list.json // box 10
var message_list = require("../files/message_list.json");
var verify_format = require("./verify_format");
var authenticate_data = require("./authenticate_data");
const dotenv = require("dotenv").config();

//import * from './data_scripts'

async function receive_data(data_packet, instruction) {
  console.log("instruction: ", instruction);

  var errorcode = 0;
  var result = null;

  //auth = 0
  var auth = 100;

  //format = 0
  var format = 200;

  //format = verify_format(data_packet) //box 02
  format = verify_format(data_packet);
  //if format equals 1 then:
  if (format == 201) {
    //  auth = authenticate_data(data_packet) //box 03
    auth = authenticate_data(data_packet);
    //    if auth equals 1 then:
    if (auth == 101) {
      //if validated and authenticated, call instruction in data_packet
      //see boxes 20-29
      //call instruction passed in by data route
      console.log("Call Function");
      var result = await instruction(data_packet);
      console.log("[receive_data]", result);
      //return result;
    } else {
      //      set errorcode
      errorcode = auth;
    }
  } else {
    //  set errorcode
    errorcode = format;
  }
  //send status code and message to requestor*/
  var returnItem = null;
  if (result == null || Number.isInteger(result) ) {
    returnItem = message_list[errorcode];
  } else {
    returnItem = result;
  }
  console.log("[returnItem: ]", returnItem);
  return returnItem;
}

module.exports = receive_data;
