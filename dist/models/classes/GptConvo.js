"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const addMessage_1 = __importDefault(require("../methods/GptConvo/addMessage"));
const getAllMessages_1 = __importDefault(require("../methods/GptConvo/getAllMessages"));
class GptConvo {
    constructor(uid, dataFolder) {
        this.addMessage = addMessage_1.default;
        this.getAllMessages = getAllMessages_1.default;
        const fileName = uid + ".json";
        const gptConvoFolder = path_1.default.join(dataFolder, "conversations", "assistant");
        const gptConvoFile = path_1.default.join(gptConvoFolder, fileName);
        let gptConvo = {};
        if (fs_1.default.existsSync(gptConvoFile)) {
            gptConvo = require(gptConvoFile);
        }
        ;
        this.userId = uid;
        this.messages = gptConvo.messages;
    }
    ;
}
exports.default = GptConvo;
;
