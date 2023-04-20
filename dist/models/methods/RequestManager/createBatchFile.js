"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function createBatchFile() {
    const startFile = path_1.default.join(this.rootFolder, "..", "run DCO-GPT.bat");
    const updateFile = path_1.default.join(this.rootFolder, "..", "update DCO-GPT.bat");
    const startFileContent = `@echo off
    cd ${this.rootFolder}
    node .
    pause`;
    const updateFileContent = 'cd ' + this.rootFolder
        + '\nnpm update "a3-gpt"'
        + '\npause';
    fs_1.default.writeFileSync(updateFile, updateFileContent);
    fs_1.default.writeFileSync(startFile, startFileContent);
    console.log("Batch files created.");
}
exports.default = createBatchFile;
;
