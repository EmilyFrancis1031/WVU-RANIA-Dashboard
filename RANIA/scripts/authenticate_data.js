//This function verifies the requestor is in the access control list on the hub
//Called by 01: receive_data
//update this function as you see fit
//THIS NEEDS TO CHANGE FOR CONNECTING THE DEVICE
var TinyDB = require("tinydb")
const dotenv = require('dotenv').config()
const acl_path = dotenv.DB_ACL
function authenticate_data(data_packet) {
    
    var errorcode = 100
    console.log(process.env.DB_ACL)

    acl = new TinyDB(acl_path)
    //query ACL

    acl.onReady = function(){
        //query access list with auth_token
        acl.getInfo(data_packet['meta_data']['auth_token'], function(err, key, value) {
            //if error retreiving data
            if (err) {
                errorcode = 102
              //console.log(err);
              return;
            }
            //if the auth_code is correct in the ACL
            else if(value == data_packet['auth_token']){
                //set errorcode to success
                errorcode = 101;
                
            }
                
            
          });
    }
    

    
    return errorcode  //return to 01

}

module.exports = authenticate_data