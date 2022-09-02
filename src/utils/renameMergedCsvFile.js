const fsP = require("fs/promises")

const { LOCAL_CSV_OLD_NAME, LOCAL_CSV_FILE } = require("../../config/path");

async function renameMergedCsvFile() {
    await fsP.rename("../" + LOCAL_CSV_FILE, "../" + LOCAL_CSV_OLD_NAME);
}

renameMergedCsvFile()