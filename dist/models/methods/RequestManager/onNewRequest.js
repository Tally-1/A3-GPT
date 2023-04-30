"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("../../../misc/logColors");
const MapData_1 = __importDefault(require("../../classes/MapData"));
const PlayerGptRequest_1 = __importDefault(require("../../classes/PlayerGptRequest"));
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
const RpChat_1 = __importDefault(require("../../classes/RpChat"));
const RpProfile_1 = __importDefault(require("../../classes/RpProfile"));
async function onNewRequest(request) {
    const type = request[1];
    if (type === "roleplay-chat") {
        try {
            new RpChat_1.default(request).sendRpChat(this);
            console.log("Roleplay chat request sent");
        }
        catch (error) {
            console.log(logColors_1.red + "Error on roleplay chat request: " + logColors_1.reset + error);
            console.log("Error logged to 'data\\errors\\badRequests.json'\n");
            RequestManager_1.default.logRequestFail(request.toString(), type, error, false);
        }
        ;
    }
    else if (type === "assign-profile") {
        try {
            const rq = request;
            await RpProfile_1.default.assignNewProfile(rq, this);
        }
        catch (error) {
            console.log(logColors_1.red + "Error on assign new profile request: " + logColors_1.reset + error);
            console.log("Error logged to 'data\\errors\\badRequests.json'\n");
            RequestManager_1.default.logRequestFail(request.toString(), type, error, false);
        }
        ;
    }
    else if (type === "player-gpt") {
        try {
            new PlayerGptRequest_1.default(request).sendRequest(this);
        }
        catch (error) {
            console.log(error);
            console.log(logColors_1.red + "Error on GPT assistant request: " + logColors_1.reset + error);
            console.log("Error logged to 'data\\errors\\badRequests.json'\n");
            RequestManager_1.default.logRequestFail(request.toString(), type, error, false);
        }
        ;
    }
    else if (type === "map-data") {
        const mapData = request;
        try {
            new MapData_1.default(mapData).storeMapData(this);
        }
        catch (error) {
            console.log(logColors_1.red + "Error storing map data: " + logColors_1.reset + error);
            console.log("Error logged to 'data\\errors\\badRequests.json'\n");
            RequestManager_1.default.logRequestFail(request.toString(), type, error, false);
        }
        ;
    }
    else {
        console.log("Request type not recognized: " + type);
        this.emit("request-" + type, request);
    }
    ;
}
exports.default = onNewRequest;
;
