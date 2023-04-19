"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRpProfileFromId_1 = __importDefault(require("../RpProfile/getRpProfileFromId"));
function stringMessages(timeLimit, dataFolder) {
    let messageString = "";
    this.messages.forEach((message) => {
        const speakerName = (0, getRpProfileFromId_1.default)(message.speaker, dataFolder).name;
        const currentTime = new Date().getTime();
        const timePassed = currentTime - message.nodeTime;
        if (timePassed < timeLimit) {
            messageString += speakerName + ": " + message.content + " \n";
        }
    });
    return messageString;
}
exports.default = stringMessages;
;
