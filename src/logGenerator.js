const Client = require("ssh2-sftp-client");

const logger = require("../logs/index");

require("dotenv").config({ path: "../.env" });

const sftp = new Client();

let total = 0;
let pickups = 0;
let deliveries = 0;

async function logGenerator() {
    sftp.connect({
        host: process.env.SFTP_HOST,
        port: process.env.SFTP_PORT,
        username: process.env.SFTP_USERNAME,
        password: process.env.SFTP_PASSWORD
    }).then(() => {
        return sftp.list("/in/work")
    }).then(data => {
        data.forEach(file => {
            if (file.name.includes(".xml")) {
                total++;
            }
            if (file.name.includes("Delivery")) {
                deliveries++;
            }
            if (file.name.includes("PickUp")) {
                pickups++;
            }
        })
        if (total === 0) {
            console.log("❌ ⬆️  : 0 xml file has been generated")
            logger.error("❌ ⬆️ : 0 xml file has been generated")
        }
        if (total !== 0) {
            logger.info(`✅ ⬆️ : ${total} records generated (${pickups} pickups and ${deliveries} deliveries)`);
        }
    }).then(() => {
        sftp.end();
    }).catch(err => {
        console.log(err)
    })
}

logGenerator();
