import RequestManager from "../../classes/RequestManager";

export default
function a3DebugMsg(this:RequestManager ,message:string){
    RequestManager.sendA3Request(
        "debug-message", 
        "1", 
        message, 
        this.iniDbi2Path
    );
 };