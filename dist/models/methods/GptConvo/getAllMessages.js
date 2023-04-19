"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllMessages() {
    const messages = [];
    for (const message of this.messages) {
        const userMessage = "user: " + message.message;
        const reply = "Assistant: " + message.reply;
        messages.push(userMessage);
        messages.push(reply);
    }
    console.log(messages);
    return messages;
}
exports.default = getAllMessages;
;
