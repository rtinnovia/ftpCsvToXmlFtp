const csv = require("fast-csv");
const fs = require("fs");
const _ = require("lodash");
const checkColumns = require("./utils/checkColumns");
const { LOCAL_CSV_PATH, LOCAL_CSV_PATH_GENERATED } = require("../config/path");

const filePromises = [];
const filesData = [];

fs.readdir(LOCAL_CSV_PATH, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (file.includes(".csv")) {
            const filePromise = new Promise((resolve) => {
                const fileData = [];
                csv.parseFile(LOCAL_CSV_PATH + "/" + file, { headers: true, delimiter: ";" })
                    .on("data", function (data) {
                        fileData.push(data);
                        filesData.push(fileData);
                    })
                    .on("end", function () {
                        resolve();
                    });
            });
            filePromises.push(filePromise);
        }
    });
});

Promise.all(filePromises).then(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = [];
    filesData.forEach((fileData) => {
        fileData.forEach((row) => {
            if (checkColumns(row)) {
                data.push(row);
            }
        });
    });

    // https://stackoverflow.com/a/56757215
    const uniqData = data.filter(
        (value, index, array) =>
            array.findIndex((value2) =>
                ["CODECLIENT", "NUMORDRE", "NUMDHL", "HRE", "NOMENL"].every((key) => value2[key] === value[key])
            ) === index
    );

    const finalData = _.unionBy(uniqData, function (elem) {
        return JSON.stringify(_.pick(elem, ["CODECLIENT", "NUMORDRE", "NUMDHL", "HRE", "NOMENL"]));
    });

    const csvStream = csv.format({ headers: true, delimiter: ";", quoteColumns: true });
    const writableStream = fs.createWriteStream(LOCAL_CSV_PATH_GENERATED + "/merge.csv");

    writableStream.on("finish", function () {
        console.log("✅ 🔄 : merge.csv was created !");
        if (_.isEqual(data, [])) {
            require("../logs/index").info(`✅ 🔄 : merge.csv file was created without data`);
        } 
        if (!_.isEqual(data, [])) {
            require("../logs/index").info(`✅ 🔄 : merge.csv file was created with ${data.length} row(s)`);
        } 
    });

    csvStream.pipe(writableStream);
    finalData.forEach((data) => {
        csvStream.write(data);
    });
    csvStream.end();
});
