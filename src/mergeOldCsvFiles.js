const mergeCsvFiles = require("./mergeCsvFiles")
const { LOCAL_CSV_PATH_GENERATED } = require("../config/path");

mergeCsvFiles(LOCAL_CSV_PATH_GENERATED, LOCAL_CSV_PATH_GENERATED, true);
