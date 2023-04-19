import path from "path";
import fs from "fs";
import RequestManager from "../../classes/RequestManager";

const ini = require("ini");



// Requests are made from Arma 3 by writing to an ini file, using INIDBI2.
// This method reads the ini file and returns an array of requests.
// Then the requests are processed and the ini file is cleared.

export default
function getRequests(this:RequestManager) {try{

    const A3RequestFile = path.join(this.iniDbi2Path, "A3-GPT_out.ini");
    const content = fs.readFileSync(A3RequestFile, 'utf-8');

    const requestList = (ini.parse(content))['A3-GPT_out'];
    const requestIds = Object.keys(requestList);

    const requests = [] as unknown as [string[]];

    for (const id of requestIds) {
    
        
        const requestString = requestList[id];

        if(requestString !== undefined){
            let rqstr = toANSI(requestString)
            let type;
            let data;

            try {[type, data] = this.parseStringArr(rqstr)}catch(e)
            {
                rqstr = rqstr.replace(/""/g, '"').replace(/""/g, '"').replace(/""/g, '"');
                [type, data] = this.parseStringArr(rqstr)
            }
            

            const request = [id, type, ...data];
            requests.push(request);
    
    }};

    return requests;

}catch(error){
    //@ts-ignore
    // console.dir(error);
    // process.exit(1);
    console.log("error get requests");
    return [];
}
}

function toANSI(string:string) {

    const nonAnsiMap = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'ñ': 'n',
      'ł': 'l'
    };
  
    return string.replace(/[^\x00-\x7F]/g, function(match) {//@ts-ignore
      return nonAnsiMap[match] || '';
    });
};