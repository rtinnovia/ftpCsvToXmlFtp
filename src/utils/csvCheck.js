const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");

async function csvCheck(pathToCsvFile, isDelivery, isPickUp) {
    const results = [];
    const validRows = [];
    const csvFile = fs.createReadStream(pathToCsvFile);

    csvFile
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {results.push(data)})
        .on("headers", (headers) => {
            if (!headers.includes("CODECLIENT")) {
                require("../logs/index").error("No 'CODECLIENT' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("NUMORDRE")) {
                require("../logs/index").error("No 'NUMORDRE' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("NUMDHL")) {
                require("../logs/index").error("No 'NUMDHL' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("HRE")) {
                require("../logs/index").error("No 'HRE' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("NOMENL")) {
                require("../logs/index").error("No 'NOMENL' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("HRL")) {
                require("../logs/index").error("No 'HRL' column in csv file");
                csvFile.destroy();
            }
            if (!headers.includes("NOMLIV")) {
                require("../logs/index").error("No 'NOMLIV' column in csv file");
                csvFile.destroy();
            }
        })
        .on("end", () => {
            for (let result of results) {
                if (isPickUp) {
                    if (result.CODECLIENT === "") {
                        continue;
                    }
                    if (result.NUMORDRE === "") {
                        continue;
                    }
                    if (result.NUMDHL === "") {
                        continue;
                    }
                    if (!moment(result.HRE, "YYYY/MM/DD HH:mm", true).isValid()) {
                        continue;
                    }
                    if (result.NOMENL === "") {
                        continue;
                    }
                }

                if (isDelivery) {
                    if (result.CODECLIENT === "") {
                        continue;
                    }
                    if (result.NUMORDRE === "") {
                        continue;
                    }
                    if (result.NUMDHL === "") {
                        continue;
                    }
                    if (!moment(result.HRL, "YYYY/MM/DD HH:mm", true).isValid()) {
                        continue;
                    }
                    if (result.NOMLIV === "") {
                        continue;
                    }
                }
                validRows.push(result);
            }
        });
    await new Promise((resolve) => setTimeout(resolve, 100));
    return validRows;
}

module.exports = csvCheck;
