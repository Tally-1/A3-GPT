"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyFolderSync(source, target) {
    const fs = require('fs');
    const path = require('path');
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    fs.readdirSync(source).forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyFolderSync(sourcePath, targetPath);
        }
        else {
            if (!fs.existsSync(targetPath)) {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    });
}
;
function initA3GPT(includeBatchFile = false) {
    const path = require('path');
    const rootFolder = process.cwd();
    const npmDataFolder = path.join(__dirname, "..", "..", "data");
    const newDataFolder = path.join(rootFolder, "data");
    copyFolderSync(npmDataFolder, newDataFolder);
    console.log("A3GPT: 'Data folder updated.'");
    const RequestManager = require("../models/classes/RequestManager").default;
    const mngr = new RequestManager(rootFolder, newDataFolder, includeBatchFile);
    mngr.A3GPTstream();
    mngr.sendVersion();
    return mngr;
}
exports.default = initA3GPT;
;
