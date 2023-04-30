import RequestManager from "../../classes/RequestManager";

export default
async function handleRequests(this:RequestManager){
    const allRequests = this.getRequests();

    for (const request of allRequests) { 
        this.emit('newRequest', request);
    };

    if(this.profileRequests.length > 0 
        && !this.profileProcessing){
            this.processBackLog();
    };

    if(allRequests.length > 0){
        try {this.clearIniFile("A3-GPT_out", this.iniDbi2Path);}catch(e){}
        
    };
    // process.exit();
}