const ftp = require("../ftp");

function removeFileToFTP(ftp, path) {
    ftp.on("ready", () => {
        ftp.list(path, (err, list) => {
            if (err) throw err;
            list.forEach((file) => {
                if (file.name.includes(".csv")) {
                    ftp.delete(path + file.name, (err) => {
                        if (err) throw err;
                        console.log(`${file.name} has been deleted`);
                        ftp.end();
                    });
                } 
            });
            ftp.end();
        });
    });
}

removeFileToFTP(ftp, "./");