"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function clearIniFile(fileName, iniFolder) {
    const header = "[" + fileName + "]";
    const completeFileName = fileName + ".ini";
    const filePath = path_1.default.join(iniFolder, completeFileName);
    try {
        fs_1.default.writeFileSync(filePath, header);
    }
    catch (e) {
        console.log("error clear ini: " + e);
    }
    ;
}
exports.default = clearIniFile;
;
