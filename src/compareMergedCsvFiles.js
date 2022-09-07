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
            const row2Enl = {
                CODECLIENT: row2.CODECLIENT,
                NUMORDRE: row2.NUMORDRE,
                NUMDHL: row2.NUMDHL,
                HRE: row2.HRE,
                NOMENL: row2.NOMENL
            };

            const row2Liv = {
                HRL: row2.HRL,
                NOMLIV: row2.NOMLIV
            };

            const enlIsEqual = fileData1.find((row1) => {
                const row1Enl = {
                    CODECLIENT: row1.CODECLIENT,
                    NUMORDRE: row1.NUMORDRE,
                    NUMDHL: row1.NUMDHL,
                    HRE: row1.HRE,
                    NOMENL: row1.NOMENL
                };
                return _.isEqual(row2Enl, row1Enl);
            });

            const livIsEqual = fileData1.find((row1) => {
                const row1Liv = {
                    HRL: row1.HRL,
                    NOMLIV: row1.NOMLIV
                };
                return _.isEqual(row2Liv, row1Liv);
            });

            const rowIsEqual = fileData1.find((row1) => _.isEqual(row2, row1));
            
            if (!rowIsEqual) {
                if (enlIsEqual && !livIsEqual) {
                    row2.HRE = "";
                    row2.NOMENL = "";
                    data.push(row2);
                }
                if (!enlIsEqual && !livIsEqual) {
                    data.push(row2);
                }
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
