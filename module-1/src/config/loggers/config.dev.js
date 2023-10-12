import { createLogger, format, transports, addColors } from "winston";

const { simple, colorize } = format;

const levels = {
  HTTP: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  FATAL: 5,
};

const colors = {
  HTTP: "blue",
  INFO: "white",
  WARNING: "yellow",
  ERROR: "orange",
  FATAL: "red",
};

addColors(colors);

export default createLogger({
  levels,
  format: colorize(),
  transports: [
    new transports.Console({
      level: "HTTP",
      format: simple(),
    }),
  ],
});
