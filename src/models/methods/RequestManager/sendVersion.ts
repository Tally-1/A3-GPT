import path from "path";
import RequestManager from "../../classes/RequestManager";
import sendA3Request from "./sendA3Request";


export default
function sendVersion(this:RequestManager){
    const id = -1+"";
    const type = "dco-api-version";
    const version = require(path.join(__dirname, "../../../../package.json")).version;

    sendA3Request(type, id, version, this.iniDbi2Path);
};