"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpMessage {
    constructor(content, speaker, ingameTime) {
        if (ingameTime === undefined) {
            ingameTime = [2035, 6, 6, 12, 0];
        }
        ;
        this.content = content;
        this.speaker = speaker;
        this.nodeTime = new Date().getTime();
        this.ingameTime = ingameTime;
    }
}
exports.default = RpMessage;
