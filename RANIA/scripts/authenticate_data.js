//This function verifies the requestor is in the access control list on the hub
//Called by 01: receive_data
//update this function as you see fit
//THIS NEEDS TO CHANGE FOR CONNECTING THE DEVICE
import TinyDB from "tinydb"
function authenticate_data(data_packet) {
    
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

