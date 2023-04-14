//removes device from acl
var TinyDB = require('tinydb');
const dotenv = require('dotenv').config()

function disconnect_device(data_packet) {
    
    var errorcode = 100

    acl = new TinyDB('./test.db')
    //query ACL

    acl.onReady = function(){
        //query access list with auth_token
        acl.getInfo(data_packet['meta_data'], function(err, key, value) {
            //if error retreiving data
            if (err) {
              console.log(err);
              return;
            }
            //if the auth_code is correct in the ACL
            else if(value == data_packet['auth_token']){
                //set errorcode to success
                errorcode = 101;
                
            }
            else{
                //set errorcode
                errorcode = 102;
                //end 
            }
          });
    }
    
    return errorcode  //return to 01

}

module.exports = disconnect_device