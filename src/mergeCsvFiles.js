const csv = require("fast-csv");
const fs = require("fs");
const _ = require("lodash");
const checkColumns = require("./utils/checkColumns");

const mergeCsvFiles = (pathFromMerge, pathToMerge, old) => {
    const filePromises = [];
    const filesData = [];

    fs.readdir(pathFromMerge, (err, files) => {
        if (err) throw err;
    
        files.forEach((file) => {
            if (file.includes(".csv")) {
                const filePromise = new Promise((resolve) => {
                    const fileData = [];
                    csv.parseFile(pathFromMerge + "/" + file, { headers: true, delimiter: ";" })
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
                    ["CODECLIENT", "NUMORDRE", "NUMDHL", "HRE", "NOMENL", "HRL", "NOMLIV"].every((key) => value2[key] === value[key])
                ) === index
        );

        let mergeData = [];
        for (let i = 1; i < uniqData.length; i++) {
            for (let j = 0; j < uniqData.length; j++) {
                if (i !== j) {
                    const element1 = uniqData[i];
                    const element2 = uniqData[j];
                    if (
                        element1.CODECLIENT === element2.CODECLIENT && 
                        element1.NUMORDRE === element2.NUMORDRE && 
                        element1.NUMDHL === element2.NUMDHL && 
                        element1.HRE === element2.HRE && 
                        element1.NOMENL === element2.NOMENL 
                    ) {
                        if (element1.HRL === "" && element1.NOMLIV === "") {
                            const merge = _.merge(element1, element2)
                            mergeData.push(merge)
                        }
                        if (element2.HRL === "" && element2.NOMLIV === "") {
                            const merge = _.merge(element2, element1)
                            mergeData.push(merge)
                        }
                    }
                }
            }
        }
    
        const finalData = _.unionBy(uniqData, mergeData, function (elem) {
            return JSON.stringify(_.pick(elem, ["CODECLIENT", "NUMORDRE", "NUMDHL", "HRE", "NOMENL"]));
        });
    
        const csvStream = csv.format({ headers: true, delimiter: ";", quoteColumns: true });
        const writableStream = old ? fs.createWriteStream(pathToMerge + "/old_merge.csv") : fs.createWriteStream(pathToMerge + "/merge.csv");
    
        writableStream.on("finish", function () {
            old ? console.log("✅ 🔄 : old_merge.csv has been updated !") : console.log("✅ 🔄 : merge.csv has been created !")
            if (_.isEqual(data, [])) {
                old ? require("../logs/index").info(`✅ 🔄 : old_merge.csv file has not been updated (0 new data)`) :
                require("../logs/index").info(`✅ 🔄 : merge.csv file has been created without data`);
            } 
            if (!_.isEqual(data, [])) {
                old ? require("../logs/index").info(`✅ 🔄 : old_merge.csv file has been updated with ${data.length} row(s)`) :
                require("../logs/index").info(`✅ 🔄 : merge.csv file has been created with ${data.length} row(s)`)
            } 
        });
    
        csvStream.pipe(writableStream);
        finalData.forEach((data) => {
            csvStream.write(data);
        });
        csvStream.end();
    });
}

module.exports = mergeCsvFiles;
