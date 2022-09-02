const Client = require("ftp");

require("dotenv").config({ path: "../.env" });

const ftp = new Client();

ftp.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD
});

module.exports = ftp

