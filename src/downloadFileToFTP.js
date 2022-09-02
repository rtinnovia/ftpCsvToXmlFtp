const fs = require("fs");
const fsP = require("fs/promises");

const ftp = require("./ftp");

const addHours = require("./utils/addHours");

const { LOCAL_CSV_PATH } = require("../config/path");
require("dotenv").config({ path: "../.env" });

function downloadCsvFilesToFTP(ftp, path) {
    ftp.on("ready", () => {
        ftp.list(path, (err, list) => {
            list.forEach((file) => {
                if (file.name.includes(".csv")) {
                    ftp.get(file.name, (err, stream) => {
                        if (err) throw err;
                        stream.pipe(fs.createWriteStream(LOCAL_CSV_PATH + "/" + file.name));
                        stream.once("close", () => {
                            ftp.end();
                        });
                        
                        ftp.list(file.name, async (err, list) => {
                            const dateFtpFile = addHours(2, new Date(list[0].date));
                            const fileStats = await fsP.stat(LOCAL_CSV_PATH + "/" + file.name);
                            await fsP.utimes(LOCAL_CSV_PATH + "/" + file.name, fileStats.atime, dateFtpFile);
                            ftp.end();
                        });
                    });
                }
            });
            ftp.end();
            console.log("✅ ⬇️  : csv files downloaded to ftp")
            require("../logs/index").info(`✅ ⬇️ : csv files downloaded to ftp`);
        });
    });
}

downloadCsvFilesToFTP(ftp, "./");

module.exports = downloadCsvFilesToFTP;
