"use strict";

const path = require("path");
require("dotenv").config({ path: "../.env" });

const Client = require("ssh2-sftp-client");

async function uploadDir() {
    const sftp = new Client();
    const src = "../assets/generated/xml"
    const dst = "/in/work";

    try {
        await sftp.connect({
            host: process.env.SFTP_HOST,
            username: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            port: process.env.SFTP_PORT
        });

        sftp.on("upload", (info) => {
            console.log(`✅ ⬆️ : listener : Uploaded ${info.source}\n\n`);
            require("../logs/index").info(`✅ ⬆️ : listener : Uploaded ${info.source}`);
        });

        let rslt = await sftp.uploadDir(src, dst);
        return rslt;
    } finally {
        sftp.end();
    }
}

uploadDir()
    .then((msg) => {
        console.log("✅ ⬆️  : " + msg);
        require("../logs/index").info(`✅ ⬆️ : ${msg}`);
    })
    .catch((err) => {
        console.log(`❌ ⬆️  : uploadDir error : ${err.message}`);
        require("../logs/index").error(`❌ ⬆️ : uploadDir error : ${err.message}`);
    });
