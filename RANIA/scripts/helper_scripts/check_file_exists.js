const build_db_path = require("../helper_scripts/build_db_path");

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