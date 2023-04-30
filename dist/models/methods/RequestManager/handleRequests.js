"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function handleRequests() {
    const allRequests = this.getRequests();
    for (const request of allRequests) {
        this.emit('newRequest', request);
    }
    ;
    if (this.profileRequests.length > 0
        && !this.profileProcessing) {
        this.processBackLog();
    }
    ;
    if (allRequests.length > 0) {
        try {
            this.clearIniFile("A3-GPT_out", this.iniDbi2Path);
        }
        catch (e) { }
    }
    ;
}
exports.default = handleRequests;
