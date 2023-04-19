"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GptMessage {
    constructor(prompt, playerRequest, reply, startTime, responseTime, model = "unknown") {
        const name = playerRequest.player.name;
        const message = playerRequest.message;
        const location = playerRequest.status.location;
        const position = playerRequest.status.position;
        const promptSize = prompt.length + " characters";
        const promptWords = prompt.split(" ").length + " words";
        const promptTokens = Math.round(prompt.split(" ").length * 0.75) + " - " + prompt.length / 2 + " tokens";
        this.name = name;
        this.location = location;
        this.position = position;
        this.message = message;
        this.reply = reply;
        this.model = model;
        this.promptData = [promptSize, promptWords, promptTokens];
        this.responseTime = responseTime;
        this["send-time"] = startTime;
    }
}
exports.default = GptMessage;
