"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function save(dataFolder, userInput, reply) {
    let gameTime = (userInput === null || userInput === void 0 ? void 0 : userInput.ingameTime) ? userInput.ingameTime : [2035, 6, 6, 12, 0];
    if (userInput !== undefined) {
        this.messages.push(userInput);
    }
    ;
    if (reply !== undefined) {
        this.messages.push(reply);
    }
    ;
    this.irlTimeLast = new Date().getTime();
    ;
    this.gameTimeLast = gameTime;
    const convoFolder = path_1.default.join(dataFolder, "conversations", "convoFiles");
    console.log(fs_1.default.existsSync(convoFolder));
    const filePath = path_1.default.join(convoFolder, this.fileName);
    const fileData = JSON.stringify(this, null, 4);
    fs_1.default.writeFileSync(filePath, fileData);
    return fileData;
}
exports.default = save;
;
