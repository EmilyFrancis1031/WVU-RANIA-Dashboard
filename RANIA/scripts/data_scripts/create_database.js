//This function adds the directory for the device in the rania database
//see npm FS package
import TinyDB from "tinydb"
import FS from "fs"
export function create_database(data_packet) {
    
    var errorcode = 100

    new_db = new TinyDB('./test.db')
    //query ACL

    new_db.onReady = function(){
        //if error creating database
        if (err) {
            errorcode = 100;
        }
        else{
            //set errorcode
            errorcode = 102;
            //end 
        }
    }
    
    return errorcode  //return to 01

}