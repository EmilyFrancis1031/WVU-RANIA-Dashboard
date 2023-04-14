//This function adds the directory for the device in the rania database
//see npm FS package
var TinyDB = require('tinydb');
var FS = require("fs");
const dotenv = require('dotenv').config()

function create_database(data_packet) {
    
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

module.exports = create_database