const mergeCsvFiles = require("./mergeCsvFiles")
const { LOCAL_CSV_PATH, LOCAL_CSV_PATH_GENERATED } = require("../config/path");

mergeCsvFiles(LOCAL_CSV_PATH, LOCAL_CSV_PATH_GENERATED, false);