import fs from "fs";
// override console functions
(function () {
  // constants
  const LOGS_FOLDER_DIR = "./logs";
  const LOG_FILE_DIR = `${LOGS_FOLDER_DIR}/log.txt`;
  const INFO_FILE_DIR = `${LOGS_FOLDER_DIR}/info.txt`;
  const DEBUG_FILE_DIR = `${LOGS_FOLDER_DIR}/debug.txt`;
  const WARN_FILE_DIR = `${LOGS_FOLDER_DIR}/warn.txt`;
  const ERROR_FILE_DIR = `${LOGS_FOLDER_DIR}/error.txt`;

  // utils
  const formatMessage = (message: string) => {
    const now = new Date();
    const timeStamp = now.getTime();
    const nowASString = now.toISOString();
    return `${timeStamp}; ${nowASString}; ${message}`;
  };
  const appendContent = (
    directoryPath: string,
    filePath: string,
    content: string
  ) =>
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
      if (err)
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
          if (err) throw err;
          fs.appendFile(filePath, `${content} \n`, (err) => {
            if (err) throw err;
          });
        });
      else
        fs.appendFile(filePath, `${content} \n`, (err) => {
          if (err) throw err;
        });
    });
  const appendMessageToLog = (message: string) =>
    appendContent(LOGS_FOLDER_DIR, LOG_FILE_DIR, formatMessage(message));
  const appendMessageToInfo = (message: string) =>
    appendContent(LOGS_FOLDER_DIR, INFO_FILE_DIR, formatMessage(message));
  const appendMessageToDebug = (message: string) =>
    appendContent(LOGS_FOLDER_DIR, DEBUG_FILE_DIR, formatMessage(message));
  const appendMessageToWarn = (message: string) =>
    appendContent(LOGS_FOLDER_DIR, WARN_FILE_DIR, formatMessage(message));
  const appendMessageToError = (message: string) =>
    appendContent(LOGS_FOLDER_DIR, ERROR_FILE_DIR, formatMessage(message));

  // override log function
  const originalLog = console.log;
  console.log = function () {
    const message = Array.prototype.slice.call(arguments).join(" ");
    appendMessageToLog(message);
    originalLog.apply(console, arguments);
  };
  // override info function
  const originalInfo = console.info;
  console.info = function () {
    const message = Array.prototype.slice.call(arguments).join(" ");
    appendMessageToInfo(message);
    originalInfo.apply(console, arguments);
  };
  // override debug function
  const originalDebug = console.debug;
  console.debug = function () {
    const message = Array.prototype.slice.call(arguments).join(" ");
    appendMessageToDebug(message);
    originalDebug.apply(console, arguments);
  };
  // override warn function
  const originalWarn = console.warn;
  console.warn = function () {
    const message = Array.prototype.slice.call(arguments).join(" ");
    appendMessageToWarn(message);
    originalWarn.apply(console, arguments);
  };
  // override error function
  const originalError = console.error;
  console.error = function () {
    const message = Array.prototype.slice.call(arguments).join(" ");
    appendMessageToError(message);
    originalError.apply(console, arguments);
  };
})();
