"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerStatus_1 = __importDefault(require("./PlayerStatus"));
const sendRequest_1 = __importDefault(require("../methods/PlayerGptRequest/sendRequest"));
const replyFilter_1 = __importDefault(require("../methods/PlayerGptRequest/replyFilter"));
const buildPrompt_1 = __importDefault(require("../methods/PlayerGptRequest/buildPrompt"));
class PlayerGptRequest {
    constructor(request) {
        this.sendRequest = sendRequest_1.default;
        this.buildPrompt = buildPrompt_1.default;
        const requestId = request["0"];
        const requesttype = request["1"];
        const msg = request["2"];
        const statusData = request["3"];
        const [worldName, date, status] = statusData;
        const [uid, profileId, name] = status;
        const playerStatus = new PlayerStatus_1.default(status);
        const player = {
            "uid": uid,
            "profileId": profileId,
            "name": name
        };
        this.requestId = requestId;
        this.requestType = requesttype;
        this.requestTime = Date.now();
        this.worldName = worldName;
        this.date = date;
        this.message = msg;
        this.player = player;
        this.status = playerStatus;
    }
    ;
}
exports.default = PlayerGptRequest;
PlayerGptRequest.replyFilter = replyFilter_1.default;
;
