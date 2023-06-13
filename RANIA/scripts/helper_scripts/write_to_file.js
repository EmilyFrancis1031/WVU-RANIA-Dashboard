var fs = require("fs");

function write_to_file(path, data={}){
    const dataString = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, dataString, (err) => {
        if (err) {
            resolve(16);
        } else {
            resolve(15);
        }
        });
    });
}

module.exports = write_to_file
