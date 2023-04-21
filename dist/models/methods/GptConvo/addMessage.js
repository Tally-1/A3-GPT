"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function addMessage(message, dataFolder) {
    this.messages.push(message);
    this.messages.sort((a, b) => {
        return a["send-time"] - b["send-time"];
    });
    const fileName = this.userId + ".json";
    const gptConvoFile = path_1.default.join(dataFolder, "conversations", "assistant", fileName);
    fs_1.default.writeFileSync(gptConvoFile, JSON.stringify(this, null, 2));
}
exports.default = addMessage;
;
