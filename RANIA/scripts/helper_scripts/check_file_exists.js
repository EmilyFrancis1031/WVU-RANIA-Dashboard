const fs = require("fs")

function check_file_exists(path){
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err) => {
          if (err) {
            resolve(false); // File does not exist
          } else {
            resolve(true); // File exists
          }
        });
      });
}

module.exports = check_file_exists