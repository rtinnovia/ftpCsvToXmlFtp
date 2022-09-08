const fs = require("fs");

const { LOCAL_CSV_PATH } = require("../../config/path");

fs.readdir(LOCAL_CSV_PATH, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        fs.rm(LOCAL_CSV_PATH + "/" + file, (err) => {
            if (err) throw err;
        });
    });
});
