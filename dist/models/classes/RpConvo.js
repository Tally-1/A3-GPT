"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getConversation_1 = __importDefault(require("../methods/RpConvo/getConversation"));
const save_1 = __importDefault(require("../methods/RpConvo/save"));
const stringMessages_1 = __importDefault(require("../methods/RpConvo/stringMessages"));
class RpConvo {
    constructor(idTalker, idListener, dataFolder, gameTime, situation, location, previousConvo) {
        this.save = save_1.default;
        this.stringMessages = stringMessages_1.default;
        const fileName = `${idTalker} && ${idListener}.json`;
        if (previousConvo !== undefined) {
            this.fileName = fileName;
            this.participants = previousConvo.participants;
            this.situation = previousConvo.situation;
            this.location = previousConvo.location;
            this.irlTimeFirst = previousConvo.irlTimeFirst;
            this.irlTimeLast = new Date().getTime();
            this.gameTimeFirst = previousConvo.gameTimeFirst;
            this.gameTimeLast = gameTime ? gameTime : [-1, -1, -1, -1, -1];
            this.messages = previousConvo.messages;
            return;
        }
        ;
        if (situation === undefined) {
            situation = "unknown";
        }
        ;
        if (location === undefined) {
            location = "unknown";
        }
        ;
        if (gameTime === undefined) {
            gameTime = [2035, 6, 6, 12, 0];
        }
        ;
        this.fileName = fileName;
        this.participants = [idTalker, idListener];
        this.situation = situation;
        this.location = location;
        this.irlTimeFirst = new Date().getTime();
        this.irlTimeLast = new Date().getTime();
        this.gameTimeFirst = gameTime;
        this.gameTimeLast = gameTime;
        this.messages = [];
        this.save(dataFolder);
    }
}
exports.default = RpConvo;
RpConvo.getConversation = getConversation_1.default;
;
