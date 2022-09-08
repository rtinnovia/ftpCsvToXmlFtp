const fs = require("fs/promises");

const { LOCAL_XML_PATH_GENERATED } = require("../../config/path");

async function removeRecreateFolder(folderPath) {
    try {
        await fs.rm(folderPath, { recursive: true });
        await fs.mkdir(folderPath);
    } catch (err) {
        console.error(err);
    }
}

removeRecreateFolder(LOCAL_XML_PATH_GENERATED);

module.exports = removeRecreateFolder;
