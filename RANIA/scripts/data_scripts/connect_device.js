//This function adds the requesting device to the ACL on the database
//Update for proper auth methods

//Insert data_packet['auth_token'] to access_control.json
import TinyDB from "tinydb"
export function connect_device(data_packet) {
    
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