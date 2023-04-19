"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapData_1 = __importDefault(require("../../classes/MapData"));
const PlayerGptRequest_1 = __importDefault(require("../../classes/PlayerGptRequest"));
const RpChat_1 = __importDefault(require("../../classes/RpChat"));
const RpProfile_1 = __importDefault(require("../../classes/RpProfile"));
async function handleRequests() {
    const allRequests = this.getRequests();
    for (const request of allRequests) {
        const type = request[1];
        if (type === "roleplay-chat") {
            new RpChat_1.default(request).sendRpChat(this);
            console.log("Roleplay chat request sent");
        }
        else if (type === "assign-profile") {
            const rq = request;
            await RpProfile_1.default.assignNewProfile(rq, this);
        }
        else if (type === "player-gpt") {
            new PlayerGptRequest_1.default(request).sendRequest(this);
        }
        else if (type === "map-data") {
            const mapData = request;
            new MapData_1.default(mapData).storeMapData(this);
        }
        else {
            console.log("Request type not recognized: " + type);
        }
        ;
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
