import { requestErrorLogMsg } from "../../../misc/interfaces";
import { red, reset } from "../../../misc/logColors";

export default
function logRequestFail(request:string, requestType:string, error:any, log:boolean = true){
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "data", "errors", "badRequests.json");
    const currentList = require(filePath) as requestErrorLogMsg[];
    const errorMsg = error.message;

    if(currentList === undefined){red+"Cannot log request error, logfile not found."+reset; return;};
    if(currentList.length > 100)  {currentList.splice(0, 1);};

    const logMsg = {
        requestType,
        time: new Date().toLocaleString(),
        request,
        errorMsg
    } as requestErrorLogMsg;

    currentList.push(logMsg);

    fs.writeFileSync(filePath, JSON.stringify(currentList));

    if(log) console.log("Parsing error, and request type logged to 'data\\errors\\badRequests.json'\n");
    
    return;
};