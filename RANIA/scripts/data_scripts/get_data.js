//calls tiny_db get
import TinyDB from "tinydb"
export function get_data(data_packet) {
    
    var errorcode = 301

    db_path = data_packet['sender']+'/_data.json'
    db = new TinyDB('./'+db_path)
    //query ACL

    db.onReady = function(){
        //query access list with auth_token
        db.getInfo(data_packet['meta_data'], function(err, key, value) {
            //if error retreiving data
            if (err) {
              //console.log(err);
              errorcode = 301;
              return errorcode;
            }
            else{
                //set errorcode
                newkey = key
                return {newkey: value}
                //end 
            }
          });
    }
    
    return errorcode  //return to 01

}