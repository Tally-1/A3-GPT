"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("./logColors");
function initA3GPT(includeBatchFile = false) {
    const path = require('path');
    const rootFolder = process.cwd();
    const isNpm = rootFolder.includes("node_modules");
    const npmDataFolder = path.join(__dirname, "..", "..", "data");
    const newDataFolder = path.join(rootFolder, "data");
    copyFolderSync(npmDataFolder, newDataFolder);
    console.log(logColors_1.blue + "A3GPT: " + logColors_1.reset + "Data folder updated.");
    const RequestManager = require("../models/classes/RequestManager").default;
    const mngr = new RequestManager(rootFolder, newDataFolder, includeBatchFile);
    mngr.A3GPTstream();
    mngr.sendVersion();
    process.DcoRqMngr = mngr;
    process.on("exit", ingameCrashMsg);
    return mngr;
}
exports.default = initA3GPT;
;
function ingameCrashMsg() {
    const mngr = process.DcoRqMngr;
    const text = "<t shadow='2'><t size='1.5'>[<t color='#ff3838'>DCO-GPT</t>]</t><br/><br/>"
        + "<t color='#00ffff'>The DCO-GPT API has crashed.</t><br/><br/>"
        + "<t size='0.75'>If you are the admin simply run it again to get back online.<br/>"
        + "You may need to restart the mission if you were generating profiles<br/><br/>";
    mngr.globalHint(text);
}
;
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
