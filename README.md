# Innovia x DHL csv to xml

## Installation

Setup is easy. clone the repository :

```bash
git clone https://github.com/rtinnovia/csvToXmlDHL.git
cd csvToXmlDHL
npm install
```

Create an .env file at the root of your project with the following.

```
FTP_HOST=YOUR_FTP_HOST
FTP_USERNAME=YOUR_FTP_USERNAME
FTP_PASSWORD=YOUR_FTP_PASSWORD

FTP_DHL_HOST=DHL_FTP_HOST
FTP_DHL_USERNAME=DHL_FTP_USERNAME
FTP_DHL_PASSWORD=DHL_FTP_PASSWORD
```
An example file `.env.example` is included.

Your project is ready. For start the project you need to run :

```
node main.js
```

## Description

While you run this project the script will download a file named `DHLEDI.csv` on the FTP server then it converts all full rows in the csv to a xml file. Then xml files generated will be uploads on the FTP server and the csv file will be removed.

A log is generated at the end for each run of the script. You can read the logs in `logs` folder.

