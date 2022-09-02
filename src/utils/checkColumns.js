function checkColumns (row) {
    if ((row.CODECLIENT !== "" && row.NUMORDRE !== "" && row.NUMDHL !== "" && row.HRE !== "" && row.NOMENL !== "") && ((row.HRL !== "" && row.NOMLIV !== "") || (row.HRL === "" && row.NOMLIV == ""))) {
        return true
    } 
    return false
}

module.exports = checkColumns