import path from "path";
import fs from "fs";


// Sends a request to Arma 3 by writing to an ini file.
// It is picked up by Arma 3 using INIDBI2.

export default
function sendA3Request(type:string, id:string, data:string, iniFolder:string) {
    const filePath = path.join(iniFolder, "A3-GPT_in.ini");
    
    const requestString = '\n'+id+' = ["'+type+'", "'+data+'"]'
    console.log(requestString);
    fs.appendFile(filePath, requestString, (err)=>{if(err){console.log("error send A3 req: " + err)}});

    return id;
};