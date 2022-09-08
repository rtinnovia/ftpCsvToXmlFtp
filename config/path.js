const path = require("path");

const LOCAL_CSV_PATH = path.join(__dirname, "../assets/downloads/csv")
const LOCAL_CSV_PATH_GENERATED = path.join(__dirname, "../assets/generated/csv")
const LOCAL_CSV_FILE = LOCAL_CSV_PATH_GENERATED + "/merge.csv"
const LOCAL_CSV_NEW_FILE = LOCAL_CSV_PATH_GENERATED + "/new_merge.csv"
const LOCAL_CSV_OLD_NAME = LOCAL_CSV_PATH_GENERATED + "/old_merge.csv"

const LOCAL_XML_PATH_GENERATED = path.join(__dirname, "../assets/generated/xml")

module.exports = {
    LOCAL_CSV_PATH, 
    LOCAL_CSV_PATH_GENERATED, 
    LOCAL_CSV_FILE, 
    LOCAL_CSV_OLD_NAME, 
    LOCAL_CSV_NEW_FILE, 
    LOCAL_XML_PATH_GENERATED
}