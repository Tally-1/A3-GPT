import RequestManager from "../../classes/RequestManager";
import fs from "fs";

const cyan = "\x1b[36m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

export default
function initConfig(rootFolder:string){
    const path = require('path');
    let cfgPath = path.join(rootFolder, "DCO-config.cfg");

    if(!fs.existsSync(cfgPath)){
        cfgPath = path.join(rootFolder, "..", "DCO-config.cfg");
    };

    if(!fs.existsSync(cfgPath)){
        console.log(cyan+"\nA3GPT:"+reset+red+" 'DCO-config.cfg' not found. "+reset+"\nPlease create one in the root folder\n");
        console.log(yellow+"Exiting..."+reset);
        process.exit(1);
    };
    
    const {iniFolder, apiKey} = RequestManager.parseCfg(cfgPath) as {iniFolder:string, apiKey:string};
    
    if(!fs.existsSync(iniFolder)){
        console.log(cyan+"\nA3GPT:"+reset+red+"INIDBI2 folder not found. "+reset+"\nPlease make sure the path in"+green+" DCO-config.cfg"+reset+" is correct\n");
        console.log(yellow+"Exiting..."+reset);
        process.exit(1);
    };

    return {iniFolder, apiKey};
};