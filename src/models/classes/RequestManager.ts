import handleRequests from "../methods/RequestManager/handleRequests";
import clearIniFile from "../methods/RequestManager/clearIniFile";
import getRequests from "../methods/RequestManager/getRequests";
import parseStringArr from "../methods/RequestManager/parseStringArr";
import promptGpt3 from "../methods/RequestManager/promptGpt3";
import openAiCompletion from "../methods/RequestManager/openAiCompletion";
import sendA3Request from "../methods/RequestManager/sendA3Request";
import parseCfg from "../methods/RequestManager/parseCfg";
import globalHint from "../methods/RequestManager/globalHint";
import sendVersion from "../methods/RequestManager/sendVersion";
import createBatchFile from "../methods/RequestManager/createBatchFile";
import a3DebugMsg from "../methods/RequestManager/a3DebugMsg";
import avgPromptTime from "../methods/RequestManager/avgPromptTime";
import A3GPTstream from "../methods/RequestManager/A3GPTstream";
import processBackLog from "../methods/RequestManager/processBackLog";
import EventEmitter from "events";
import { profileRequestData } from "../../misc/interfaces";
import fs from "fs";
import onNewRequest from "../methods/RequestManager/onNewRequest";


// Handles all requests to and from the Arma 3 server

export default
class RequestManager extends EventEmitter{
    GPT3PromptTimes: number[] = [];
    profileRequests: profileRequestData[] = [];
    profileProcessing: boolean = false;
    inIniLastCleared: number = 0;
    currentMap:string = "unknown";
    iniDbi2Path:string;
    apiKey:string;
    rootFolder:string;
    dataFolder:string;
    constructor(
        rootFolder:string,
        dataFolder:string,
        includeBatchFile:boolean = false
        ){
            super();
                    
            const path = require('path');
            let cfgPath = path.join(rootFolder, "DCO-config.cfg");

            if(!fs.existsSync(cfgPath)){
                cfgPath = path.join(rootFolder, "..", "DCO-config.cfg");
            };

            if(!fs.existsSync(cfgPath)){
                console.log("A3GPT: 'DCO-config.cfg' not found. Please create one in the root folder");
                console.log("Exiting...");
                process.exit(1);
            };
            
            const {iniFolder, apiKey} = RequestManager.parseCfg(cfgPath) as {iniFolder:string, apiKey:string};
            
            this.rootFolder  = rootFolder;
            this.dataFolder  = dataFolder;
            this.iniDbi2Path = iniFolder;
            this.apiKey      = apiKey;
            
            if(includeBatchFile) this.createBatchFile();

            this.on("newRequest", this.onNewRequest);

             
    };
     
    
    
    createBatchFile = createBatchFile;

    A3GPTstream = A3GPTstream;
    handleRequests = handleRequests;
    getRequests = getRequests;
    onNewRequest = onNewRequest;

    parseStringArr = parseStringArr;
    clearIniFile = clearIniFile;
    processBackLog = processBackLog;

    avgPromptTime = avgPromptTime;
    
    globalHint = globalHint;
    a3DebugMsg = a3DebugMsg;
    sendVersion = sendVersion;
    
    static parseCfg = parseCfg;
    static promptGpt3 = promptGpt3;
    static openAiCompletion = openAiCompletion;
    static sendA3Request = sendA3Request;

}