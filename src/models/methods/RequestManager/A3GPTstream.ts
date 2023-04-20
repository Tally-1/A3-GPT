import sleep from "../../../misc/sleep";
import RequestManager from "../../classes/RequestManager";

export default
async function A3GPTstream(this:RequestManager) {
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