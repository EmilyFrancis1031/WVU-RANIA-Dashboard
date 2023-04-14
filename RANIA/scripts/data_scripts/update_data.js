//calls tiny_db update
var TinyDB = require('tinydb');
function update_data(data_packet) {
    
    var errorcode = 301

    data = data_packet['data']

    db_path = data_packet['sender']+'/_data.json'
    db = new TinyDB('./'+db_path)
    //query ACL

    db.onReady = function(){
        //query access list with auth_token
        db.setInfo(data['k'], data['v'], function(err, key, value) {
            if (err) {
              console.log(err);
              return;
            }
            
            console.log('[setInfo] ' + key + ' : ' + value);
          });
    }
    
    return errorcode  //return to 01

}

module.exports = update_data