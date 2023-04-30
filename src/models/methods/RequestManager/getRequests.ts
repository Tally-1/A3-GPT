import path from "path";
import fs from "fs";
import RequestManager from "../../classes/RequestManager";

const ini = require("ini");



// Requests are made from Arma 3 by writing to an ini file, using INIDBI2.
// This method reads the ini file and returns an array of requests.
// Then the requests are processed and the ini file is cleared.

export default
function getRequests(this:RequestManager) {
    
    const requests      = [] as unknown as [string[]];
    const ids           = [] as unknown as string[];
    const A3RequestFile = path.join(this.iniDbi2Path, "A3-GPT_out.ini");
    const lines         = fs.readFileSync(A3RequestFile, 'utf-8').split("\n");

    let i = 0;
    for (const line of lines) {

        const splitPoint = line.indexOf("="); 
        const id = line.slice(0, splitPoint);
        const rawRequest = line.slice(splitPoint + 1).trim();

        if(id !== undefined 
        && rawRequest !== undefined
        && rawRequest.length > 0
        && i>0){
            
            ids.push(id);        
            const parsedRequest = this.parseStringArr(rawRequest);

            if(parsedRequest !== undefined
            && parsedRequest.length > 0
            && typeof parsedRequest === "object"){
                
                const [type, data] = parsedRequest;
                const request = [id, type, ...data];   
                requests.push(request);
            };
        };
        i++;
    };

    return requests;
}

