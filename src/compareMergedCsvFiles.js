const fs = require("fs");
const csv = require("fast-csv");
const _ = require("lodash");
const { LOCAL_CSV_PATH_GENERATED } = require("../config/path");

function compareMergedCsvFiles() {
    const file1 = LOCAL_CSV_PATH_GENERATED + "/old_merge.csv";
    const file2 = LOCAL_CSV_PATH_GENERATED + "/merge.csv";
    const fileData1 = [];
    const fileData2 = [];

    const file1Promise = new Promise((resolve) => {
        csv.parseFile(file1, { headers: true, delimiter: ";" })
            .on("data", function (data) {
                fileData1.push(data);
            })
            .on("end", function () {
                resolve();
            });
    });

    const file2Promise = new Promise((resolve) => {
        csv.parseFile(file2, { headers: true, delimiter: ";" })
            .on("data", function (data) {
                fileData2.push(data);
            })
            .on("end", function () {
                resolve();
            });
    });

    Promise.all([file1Promise, file2Promise]).then(() => {
        const data = [];
        fileData2.map((row2) => {
            const objExist = fileData1.find((row1) => _.isEqual(row2, row1));
            if (!objExist) {
                data.push(row2);
            }
        });

        const csvStream = csv.format({ headers: true, delimiter: ";", quoteColumns: true });
        const writableStream = fs.createWriteStream(LOCAL_CSV_PATH_GENERATED + "/new_merge.csv");

        writableStream.on("finish", function () {
            console.log("✅ 🔄 : new_merge.csv file was created !");
            if (_.isEqual(data, [])) {
                require("../logs/index").info(`✅ 🔄 : new_merge.csv file was created without data`);
            } 
            if (!_.isEqual(data, [])) {
                require("../logs/index").info(`✅ 🔄 : new_merge.csv file was created with ${data.length} row(s)`);
            } 
        });

        csvStream.pipe(writableStream);
        data.forEach((data) => {
            csvStream.write(data);
        });
        csvStream.end();
    });
}

compareMergedCsvFiles();
