const fs = require('fs');

function delete_file(filePath) {
  return new Promise((resolve, reject) => {
    // console.log("[Reading File]: ", filePath)
    fs.unlink(filePath, (err) => {
        if (err) {
          resolve(350);
        } else {
          resolve(351);
        }
    });
  });
}

module.exports = delete_file