import handleRequests from "../methods/RequestManager/handleRequests";
import clearIniFile from "../methods/RequestManager/clearIniFile";
import getRequests from "../methods/RequestManager/getRequests";
import parseStringArr from "../methods/RequestManager/parseStringArr";
import promptGpt3 from "../methods/RequestManager/promptGpt3";
import openAiCompletion from "../methods/RequestManager/openAiCompletion";
import sendA3Request from "../methods/RequestManager/sendA3Request";
import { profileRequestData } from "../../misc/interfaces";
import sleep from "../../misc/sleep";
import RpProfile from "./RpProfile";
import path from "path";
import fs from "fs";

// Handles all requests to and from the Arma 3 server

export default
class RequestManager{
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



        const {iniFolder, apiKey} = this.parseCfg(cfgPath) as {iniFolder:string, apiKey:string};
        
        this.rootFolder  = rootFolder;
        this.dataFolder  = dataFolder;
        this.iniDbi2Path = iniFolder;
        this.apiKey      = apiKey;
        
        if(includeBatchFile) this.createBatchFile();

             
    };
     
     globalHint(text:string, startupHint:boolean = false){
        const id = -1+"";
        let type = "hint-global";
        if(startupHint) type = "hint-global-startup";
        sendA3Request(type, id, text, this.iniDbi2Path);
    };

     handleRequests = handleRequests;
     clearIniFile = clearIniFile;
     getRequests = getRequests;
     parseStringArr = parseStringArr;

     parseCfg(cfgPath:string) {
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
      //@ts-ignore
      configData[key.trim()] = value.trim();
    }
    return configData;
    };

     createBatchFile(this:RequestManager){
        const startFile = path.join(this.rootFolder,"..", "run DCO-GPT.bat");
        const updateFile = path.join(this.rootFolder,"..", "update DCO-GPT.bat");

        const startFileContent = `@echo off
        cd ${this.rootFolder}
        node .
        pause`;

        const updateFileContent = 
         'cd '+this.rootFolder
        +'\nnpm update "a3-gpt"'
        +'\npause';

        fs.writeFileSync(updateFile, updateFileContent);
        fs.writeFileSync(startFile, startFileContent);

        console.log("Batch files created.");
    };

     a3DebugMsg(this:RequestManager ,message:string){
        RequestManager.sendA3Request(
            "debug-message", 
            "1", 
            message, 
            this.iniDbi2Path
        );
     }

     avgPromptTime(){
            if(this === undefined) {console.log("undefined request-manager"); process.exit();return 0;};
            if(this.GPT3PromptTimes.length < 1){return 0};
            const sum = this.GPT3PromptTimes.reduce((a, b) => a + b, 0);
            const avg = (sum / this.GPT3PromptTimes.length) || 0;
            return avg;
        };
     
    async  A3GPTstream(this:RequestManager) {
        this.a3DebugMsg("A3GPTstream started");
        
        while (true) {
            await this.handleRequests();

            await sleep(100);

            if(this.profileRequests.length > 0 
                && !this.profileProcessing){
                    this.processBackLog();
            };
        };
    };

    async processBackLog(this:RequestManager){
    
        this.profileProcessing = true;
        console.log("Processing backlog of " + this.profileRequests.length + " requests");
    
        for (let i = 0; i < this.profileRequests.length; i++) {
            const request = this.profileRequests[i] as unknown as profileRequestData;
            const startTime = Date.now();
            const profileName = await RpProfile.assignNewProfile(request, this);

            if(profileName){
               this.a3DebugMsg("Profile " + profileName + " generated by GPT-3 in " + (Date.now() - startTime) + "ms");

               if(this.profileRequests.length-i > 0){
                     this.a3DebugMsg("Backlog of " + (this.profileRequests.length-i) + " requests remaining");
                };

            };

            await sleep(3000); // Wait 3 second before sending next request, to avoid 429 errors.
            
            this.profileRequests.splice(i, 1);
            i--; 
            
          }
    
        this.profileProcessing = false;
    
    };




     static promptGpt3 = promptGpt3;
     static openAiCompletion = openAiCompletion;
     static sendA3Request = sendA3Request;

}