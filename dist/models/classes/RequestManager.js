"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleRequests_1 = __importDefault(require("../methods/RequestManager/handleRequests"));
const clearIniFile_1 = __importDefault(require("../methods/RequestManager/clearIniFile"));
const getRequests_1 = __importDefault(require("../methods/RequestManager/getRequests"));
const parseStringArr_1 = __importDefault(require("../methods/RequestManager/parseStringArr"));
const promptGpt3_1 = __importDefault(require("../methods/RequestManager/promptGpt3"));
const openAiCompletion_1 = __importDefault(require("../methods/RequestManager/openAiCompletion"));
const sendA3Request_1 = __importDefault(require("../methods/RequestManager/sendA3Request"));
const sleep_1 = __importDefault(require("../../misc/sleep"));
const RpProfile_1 = __importDefault(require("./RpProfile"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class RequestManager {
    constructor(rootFolder, dataFolder, includeBatchFile = false) {
        this.GPT3PromptTimes = [];
        this.profileRequests = [];
        this.profileProcessing = false;
        this.inIniLastCleared = 0;
        this.currentMap = "unknown";
        this.handleRequests = handleRequests_1.default;
        this.clearIniFile = clearIniFile_1.default;
        this.getRequests = getRequests_1.default;
        this.parseStringArr = parseStringArr_1.default;
        const path = require('path');
        let cfgPath = path.join(rootFolder, "DCO-config.cfg");
        if (!fs_1.default.existsSync(cfgPath)) {
            cfgPath = path.join(rootFolder, "..", "DCO-config.cfg");
        }
        ;
        if (!fs_1.default.existsSync(cfgPath)) {
            console.log("A3GPT: 'DCO-config.cfg' not found. Please create one in the root folder");
            console.log("Exiting...");
            process.exit(1);
        }
        ;
        const { iniFolder, apiKey } = this.parseCfg(cfgPath);
        this.rootFolder = rootFolder;
        this.dataFolder = dataFolder;
        this.iniDbi2Path = iniFolder;
        this.apiKey = apiKey;
        if (includeBatchFile)
            this.createBatchFile();
    }
    ;
    globalHint(text, startupHint = false) {
        const id = -1 + "";
        let type = "hint-global";
        if (startupHint)
            type = "hint-global-startup";
        (0, sendA3Request_1.default)(type, id, text, this.iniDbi2Path);
    }
    ;
    parseCfg(cfgPath) {
        const fs = require('fs');
        const configFile = fs.readFileSync(cfgPath, 'utf8');
        const lines = configFile.split('\n');
        const configData = {};
        for (const line of lines) {
            if (line.startsWith('#')
                || (!line.includes('='))
                || (line.startsWith('['))) {
                continue;
            }
            const [key, value] = line.split('=');
            configData[key.trim()] = value.trim();
        }
        return configData;
    }
    ;
    createBatchFile() {
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
    ;
    a3DebugMsg(message) {
        RequestManager.sendA3Request("debug-message", "1", message, this.iniDbi2Path);
    }
    avgPromptTime() {
        if (this === undefined) {
            console.log("undefined request-manager");
            process.exit();
            return 0;
        }
        ;
        if (this.GPT3PromptTimes.length < 1) {
            return 0;
        }
        ;
        const sum = this.GPT3PromptTimes.reduce((a, b) => a + b, 0);
        const avg = (sum / this.GPT3PromptTimes.length) || 0;
        return avg;
    }
    ;
    async A3GPTstream() {
        this.a3DebugMsg("A3GPTstream started");
        while (true) {
            await this.handleRequests();
            await (0, sleep_1.default)(100);
            if (this.profileRequests.length > 0
                && !this.profileProcessing) {
                this.processBackLog();
            }
            ;
        }
        ;
    }
    ;
    async processBackLog() {
        this.profileProcessing = true;
        console.log("Processing backlog of " + this.profileRequests.length + " requests");
        for (let i = 0; i < this.profileRequests.length; i++) {
            const request = this.profileRequests[i];
            const startTime = Date.now();
            const profileName = await RpProfile_1.default.assignNewProfile(request, this);
            if (profileName) {
                this.a3DebugMsg("Profile " + profileName + " generated by GPT-3 in " + (Date.now() - startTime) + "ms");
                if (this.profileRequests.length - i > 0) {
                    this.a3DebugMsg("Backlog of " + (this.profileRequests.length - i) + " requests remaining");
                }
                ;
            }
            ;
            await (0, sleep_1.default)(3000);
            this.profileRequests.splice(i, 1);
            i--;
        }
        this.profileProcessing = false;
    }
    ;
}
exports.default = RequestManager;
RequestManager.promptGpt3 = promptGpt3_1.default;
RequestManager.openAiCompletion = openAiCompletion_1.default;
RequestManager.sendA3Request = sendA3Request_1.default;
