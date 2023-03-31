//This function is called by the route that receives all requests from devices
//It verifies the data is in a correct format, authenticates that the request is from a valid source, and executes the request command
//A status code and message is returned to sender

//include message_list.json // box 10
import message_list from '../files/message_list.json'
import verify_format from './verify_format'
import authenticate_data from './authenticate_data'
//import * from './data_scripts'

export function receive_data(data_packet) {

  var errorcode = 0;
  
  //auth = 0
  var auth = 100
  
  //format = 0
  var format = 200

  //format = verify_format(data_packet) //box 02
  format = verify_format(data_packet)
  //if format equals 1 then:
  if(format == 201){
    //  auth = authenticate_data(data_packet) //box 03
    auth = authenticate_data(data_packet)
    //    if auth equals 1 then:
    if(auth == 101){
      //if validated and authenticated, call instruction in data_packet
      //see boxes 20-29
      //data_packet['instruction'](data_packet)
      data_packet['instruction'](data_packet)
    }
    else{
      //      set errorcode
      errorcode = auth
    }     
  }
  else{
    //  set errorcode
    errorcode = format
  }
  //send status code and message to requestor*/
  return message_list[errorcode]
}