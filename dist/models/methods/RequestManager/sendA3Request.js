"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function sendA3Request(type, id, data, iniFolder) {
    const filePath = path_1.default.join(iniFolder, "A3-GPT_in.ini");
    const requestString = '\n' + id + ' = ["' + type + '", "' + data + '"]';
    console.log(requestString);
    fs_1.default.appendFile(filePath, requestString, (err) => { if (err) {
        console.log("error send A3 req: " + err);
    } });
    return id;
}
exports.default = sendA3Request;
;
