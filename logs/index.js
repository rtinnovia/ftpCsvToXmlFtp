const winston = require("winston");
const { format } = require("winston")
const { combine, timestamp, printf } = format
require("winston-daily-rotate-file");

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const transport = new winston.transports.DailyRotateFile({
    level: "info",
    filename: "../logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
});

const logger = winston.createLogger({
    format: combine (
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
    ),
    transports: [transport],
});

module.exports = logger;
