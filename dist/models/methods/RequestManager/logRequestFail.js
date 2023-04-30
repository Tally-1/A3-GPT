"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("../../../misc/logColors");
function logRequestFail(request, requestType, error, log = true) {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "data", "errors", "badRequests.json");
    const currentList = require(filePath);
    const errorMsg = error.message;
    if (currentList === undefined) {
        logColors_1.red + "Cannot log request error, logfile not found." + logColors_1.reset;
        return;
    }
    ;
    if (currentList.length > 100) {
        currentList.splice(0, 1);
    }
    ;
    const logMsg = {
        requestType,
        time: new Date().toLocaleString(),
        request,
        errorMsg
    };
    currentList.push(logMsg);
    fs.writeFileSync(filePath, JSON.stringify(currentList));
    if (log)
        console.log("Parsing error, and request type logged to 'data\\errors\\badRequests.json'\n");
    return;
}
exports.default = logRequestFail;
;
