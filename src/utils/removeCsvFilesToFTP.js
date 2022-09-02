const ftp = require("./ftp");

require("dotenv").config({ path: "../.env" });

async function removeFileToFTP(ftp, path) {
    ftp.on("ready", () => {
        ftp.list(path, (err, list) => {
            list.forEach((file) => {
                if (file.name.includes(".csv")) {
                    ftp.delete(file.name, (err) => {
                        if (err) throw err;
                        ftp.end();
                    });
                } else {
                    ftp.end()
                }
            });
        });
    });
}

removeFileToFTP(ftp, "./");

module.exports = removeFileToFTP;
