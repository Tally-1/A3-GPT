"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
const fs_1 = __importDefault(require("fs"));
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";
function initConfig(rootFolder) {
    const path = require('path');
    let cfgPath = path.join(rootFolder, "DCO-config.cfg");
    if (!fs_1.default.existsSync(cfgPath)) {
        cfgPath = path.join(rootFolder, "..", "DCO-config.cfg");
    }
    ;
    if (!fs_1.default.existsSync(cfgPath)) {
        console.log(cyan + "\nA3GPT:" + reset + red + " 'DCO-config.cfg' not found. " + reset + "\nPlease create one in the root folder\n");
        console.log(yellow + "Exiting..." + reset);
        process.exit(1);
    }
    ;
    const { iniFolder, apiKey } = RequestManager_1.default.parseCfg(cfgPath);
    if (!fs_1.default.existsSync(iniFolder)) {
        console.log(cyan + "\nA3GPT:" + reset + red + "INIDBI2 folder not found. " + reset + "\nPlease make sure the path in" + green + " DCO-config.cfg" + reset + " is correct\n");
        console.log(yellow + "Exiting..." + reset);
        process.exit(1);
    }
    ;
    return { iniFolder, apiKey };
}
exports.default = initConfig;
;
