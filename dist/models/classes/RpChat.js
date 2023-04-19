"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validProfiles_1 = __importDefault(require("../methods/RpChat/validProfiles"));
const formatReply_1 = __importDefault(require("../methods/RpChat/formatReply"));
const generatePrompt_1 = __importDefault(require("../methods/RpChat/generatePrompt"));
const sendRpChat_1 = __importDefault(require("../methods/RpChat/sendRpChat"));
class RpChat {
    constructor(request) {
        this.validProfiles = validProfiles_1.default;
        this.formatReply = formatReply_1.default;
        this.generatePrompt = generatePrompt_1.default;
        this.sendRpChat = sendRpChat_1.default;
        const [id, type, userInput, talkerId, listenerId, situation, location, ingameTime, gptModel] = request;
        const time = new Date().getTime();
        this.id = id;
        this.type = type;
        this.userInput = userInput;
        this.talkerId = talkerId;
        this.listenerId = listenerId;
        this.situation = situation;
        this.location = location;
        this.ingameTime = ingameTime;
        this.gptModel = gptModel;
    }
}
exports.default = RpChat;
;
