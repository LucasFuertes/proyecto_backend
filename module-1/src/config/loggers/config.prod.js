import { createLogger, format, transports } from "winston";

const { simple } = format;

const levels = {
  HTTP: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  FATAL: 5,
};

export default createLogger({
  levels,
  transports: [
    new transports.Console({
      level: "HTTP",
      format: simple(),
    }),
    new transports.File({
      level: "WARNING",
      format: simple(),
      filename: "./errors.log",
    }),
  ],
});
