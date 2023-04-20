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
const parseCfg_1 = __importDefault(require("../methods/RequestManager/parseCfg"));
const globalHint_1 = __importDefault(require("../methods/RequestManager/globalHint"));
const sendVersion_1 = __importDefault(require("../methods/RequestManager/sendVersion"));
const createBatchFile_1 = __importDefault(require("../methods/RequestManager/createBatchFile"));
const a3DebugMsg_1 = __importDefault(require("../methods/RequestManager/a3DebugMsg"));
const avgPromptTime_1 = __importDefault(require("../methods/RequestManager/avgPromptTime"));
const A3GPTstream_1 = __importDefault(require("../methods/RequestManager/A3GPTstream"));
const processBackLog_1 = __importDefault(require("../methods/RequestManager/processBackLog"));
const events_1 = __importDefault(require("events"));
const fs_1 = __importDefault(require("fs"));
const onNewRequest_1 = __importDefault(require("../methods/RequestManager/onNewRequest"));
class RequestManager extends events_1.default {
    constructor(rootFolder, dataFolder, includeBatchFile = false) {
        super();
        this.GPT3PromptTimes = [];
        this.profileRequests = [];
        this.profileProcessing = false;
        this.inIniLastCleared = 0;
        this.currentMap = "unknown";
        this.createBatchFile = createBatchFile_1.default;
        this.A3GPTstream = A3GPTstream_1.default;
        this.handleRequests = handleRequests_1.default;
        this.getRequests = getRequests_1.default;
        this.onNewRequest = onNewRequest_1.default;
        this.parseStringArr = parseStringArr_1.default;
        this.clearIniFile = clearIniFile_1.default;
        this.processBackLog = processBackLog_1.default;
        this.avgPromptTime = avgPromptTime_1.default;
        this.globalHint = globalHint_1.default;
        this.a3DebugMsg = a3DebugMsg_1.default;
        this.sendVersion = sendVersion_1.default;
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
        const { iniFolder, apiKey } = RequestManager.parseCfg(cfgPath);
        this.rootFolder = rootFolder;
        this.dataFolder = dataFolder;
        this.iniDbi2Path = iniFolder;
        this.apiKey = apiKey;
        if (includeBatchFile)
            this.createBatchFile();
        this.on("newRequest", this.onNewRequest);
    }
    ;
}
exports.default = RequestManager;
RequestManager.parseCfg = parseCfg_1.default;
RequestManager.promptGpt3 = promptGpt3_1.default;
RequestManager.openAiCompletion = openAiCompletion_1.default;
RequestManager.sendA3Request = sendA3Request_1.default;
