const fs = require("fs");
const _ = require("lodash")
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const { LOCAL_CSV_NEW_FILE, LOCAL_XML_PATH_GENERATED } = require("../config/path");
const template = require("./template");
const csvCheck = require("./utils/csvCheck");

const pathToCsvFile = LOCAL_CSV_NEW_FILE;

// Pickup
async function convertIntoPickupDirectory() {
    const pickups = await csvCheck(pathToCsvFile, false, true);
    
    if (!_.isEqual(pickups, [])) {

        pickups.forEach((pickup) => {
            const HRE = moment(pickup.HRE, "YYYY-MM-DD hh:mm").format();
    
            fs.writeFile(
                `${LOCAL_XML_PATH_GENERATED}/Innovia_PickUp_${"LMT_Pickup" + "_" + moment().format() + "_" + uuidv4()}.xml`,
                template("LMT_Pickup", HRE, pickup.NUMDHL, pickup.NOMENL, moment(new Date(), "YYYY-MM-DD hh:mm").format()),
                function (err) {
                    if (err) throw console.log(err);
                }
            );
        });
        console.log("✅ 🔄 : pickup xml file(s) has been created");
        require("../logs/index").info(`✅ 🔄 : pickup xml file(s) has been created`);
    }
    if (_.isEqual(pickups, [])) {
        console.log("❌ 🔄 : no pickup xml file(s) has been created");
        require("../logs/index").info(`❌ 🔄 : no pickup xml file(s) has been created`);
    }
}

// Delivery
async function convertIntoDeliveryDirectory() {
    const deliveries = await csvCheck(pathToCsvFile, true, false);

    if (!_.isEqual(deliveries, [])) {
        
        deliveries.forEach((delivery) => {
            const HRL = moment(delivery.HRL, "YYYY-MM-DD hh:mm").format();
    
            fs.writeFile(
                `${LOCAL_XML_PATH_GENERATED}/Innovia_Delivery_${"LMT_Delivery" + "_" + moment().format() + "_" + uuidv4()}.xml`,
                template("LMT_Delivery", HRL, delivery.NUMDHL, delivery.NOMLIV, moment(new Date(), "YYYY-MM-DD hh:mm").format()),
                function (err) {
                    if (err) throw console.log(err);
                }
            );
        });
        console.log("✅ 🔄 : delivery xml file(s) has been created");
        require("../logs/index").info(`✅ 🔄 : delivery xml file(s) has been created`);
    }
    if (_.isEqual(deliveries, [])) {
        console.log("❌ 🔄 : no delivery xml file has been created");
        require("../logs/index").info(`❌ 🔄 : no delivery xml file has been created`);
    }
}

convertIntoPickupDirectory();
convertIntoDeliveryDirectory();

module.exports = { convertIntoPickupDirectory };
