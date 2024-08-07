import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
import fsPromises from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

// Convert the file URL to a path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  const origin = req.headers.origin || "Origin not set";
  logEvents(`${req.method}\t${origin}\t${req.url}`, "reqLog.txt");
  next();
};

export { logger, logEvents };
