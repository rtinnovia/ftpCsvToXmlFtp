# Innovia x DHL csv to xml

## Installation

Setup is easy. clone the repository :

```bash
git clone https://github.com/rtinnovia/csvToXmlDHL.git
cd ftpCsvToXmlFtp
npm install 
```

Create an .env file at the root of your project with the following.

```
FTP_HOST=FTP_HOST
FTP_USERNAME=FTP_USERNAME
FTP_PASSWORD=FTP_PASSWORD

SFTP_HOST=SFTP_HOST
SFTP_USERNAME=SFTP_USERNAME
SFTP_PASSWORD=SFTP_PASSWORD
SFTP_PORT=SFTP_PORT
```
An example file `.env.example` is included.

Your project is ready. For start the project you need to run :

```
npm run go
```

## Description

While you run this project the script will download all files with `.csv` extension from the FTP server then it converts all full rows in the csv to a xml file. Then xml files generated will be uploads on the SFTP server and the csv files will be removed.

Various logs are generated during each runs of the script. You can read the logs in `logs` folder.

