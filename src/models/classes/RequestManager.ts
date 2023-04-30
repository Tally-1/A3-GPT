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
import initConfig from "../methods/RequestManager/initConfig";
import checkApiKey from "../methods/RequestManager/checkApiKey";
import initDbFiles from "../methods/RequestManager/initDbFiles";
import logRequestFail from "../methods/RequestManager/logRequestFail";



// Handles all requests to and from the Arma 3 server

export default
class RequestManager extends EventEmitter{
    GPT3PromptTimes: number[] = [];
    profileRequests: profileRequestData[] = [];
    profileProcessing: boolean = false;
    prevProfileRequestTime: number = 0;
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

            const {iniFolder, apiKey} = this.initConfig(rootFolder);  
            
            this.rootFolder  = rootFolder;
            this.dataFolder  = dataFolder;
            this.iniDbi2Path = iniFolder;
            this.apiKey      = apiKey;

            this.initDbFiles();
            if(includeBatchFile) this.createBatchFile();

            this.checkApiKey();
            this.on("newRequest", this.onNewRequest);

    };
     
    
    
    initConfig = initConfig;
    initDbFiles = initDbFiles;
    checkApiKey = checkApiKey;    
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
    
    static logRequestFail = logRequestFail;
    static parseCfg = parseCfg;
    static promptGpt3 = promptGpt3;
    static openAiCompletion = openAiCompletion;
    static sendA3Request = sendA3Request;

}