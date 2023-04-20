import RequestManager from "../../classes/RequestManager";

export default
function globalHint(this:RequestManager, text:string, startupHint:boolean = false){
    const id = -1+"";
    let type = "hint-global";
    if(startupHint) type = "hint-global-startup";
    RequestManager.sendA3Request(type, id, text, this.iniDbi2Path);
};