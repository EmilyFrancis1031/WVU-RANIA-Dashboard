//remove tiny_db json file from directory
var fs = require("fs")
export function destroy_database(data_packet) {
    const to_remove = data_packet["data"]["to_remove"]
    db_path = "./rania_db/device_data/"+to_remove
    try {
        fs.unlinkSync(db_path);
      
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
    
}