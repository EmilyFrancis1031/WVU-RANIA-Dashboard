const fs = require('fs');

function read_file(filePath) {
  return new Promise((resolve, reject) => {
    console.log("[Reading File]: ", filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        resolve(21);
      } else {
        // console.log("[Old meta_data]: ", data)
        resolve(data);
      }
    });
  });
}

module.exports = read_file
