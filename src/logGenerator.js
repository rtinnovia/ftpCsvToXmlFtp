const Client = require("ssh2-sftp-client");

const logger = require("../logs/index");

require("dotenv").config({ path: "../.env" });

const sftp = new Client();

let total = 0;
let pickups = 0;
let deliveries = 0;

function logGenerator() {
    sftp.connect({
        host: SFTP_HOST,
        port: SFTP_PORT,
        username: SFTP_USERNAME,
        password: SFTP_PASSWORD
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
            logger.error("No data in csv file")
        }
        if (total !== 0) {
            logger.info(`${total} records generated (${pickups} pickups and ${deliveries} deliveries)`);
        }
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        sftp.end()
    })
}

logGenerator();
