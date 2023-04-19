"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const RpConvo_1 = __importDefault(require("../../classes/RpConvo"));
function getConversation(talkerId, listenerId, ingameTime, situation, location, dataFolder) {
    const convoFolder = path_1.default.join(dataFolder, "conversations", "convoFiles");
    const allConversations = fs_1.default.readdirSync(convoFolder);
    const fileName = `${talkerId} && ${listenerId}.json`;
    if (!allConversations.includes(fileName)) {
        const newConvo = new RpConvo_1.default(talkerId, listenerId, dataFolder, ingameTime, situation, location);
        return newConvo;
    }
    ;
    const conversation = require(path_1.default.join(convoFolder, fileName));
    const convo = new RpConvo_1.default(talkerId, listenerId, dataFolder, ingameTime, situation, location, conversation);
    return convo;
}
exports.default = getConversation;
