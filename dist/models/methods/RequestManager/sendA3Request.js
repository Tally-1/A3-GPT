"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logColors_1 = require("../../../misc/logColors");
function sendA3Request(type, id, data, iniFolder) {
    const filePath = path_1.default.join(iniFolder, "A3-GPT_in.ini");
    const requestString = '\n' + id + ' = ["' + type + '", "' + data + '"]';
    let reducedData = "";
    if (type === "debug-message"
        || type === "hint-global")
        reducedData = " " + logColors_1.magenta + '"' + data + '"' + logColors_1.reset;
    const logText = logColors_1.cyan + type + logColors_1.reset + reducedData + " sent to Arma 3.";
    console.log(logText);
    fs_1.default.appendFile(filePath, requestString, (err) => { if (err) {
        console.log("error send A3 req: " + err);
    } });
    return id;
}
exports.default = sendA3Request;
;
