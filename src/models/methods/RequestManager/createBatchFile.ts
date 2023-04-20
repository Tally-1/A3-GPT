import path from "path";
import fs from "fs";
import RequestManager from "../../classes/RequestManager";


export default
function createBatchFile(this:RequestManager){
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