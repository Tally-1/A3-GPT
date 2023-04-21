"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllMessages() {
    const messages = [];
    this.messages.sort((a, b) => {
        return b["send-time"] - a["send-time"];
    });
    for (const message of this.messages) {
        const timeSinceMsg = Date.now() - message["send-time"];
        if (timeSinceMsg > 300000) {
            continue;
        }
        ;
        const userName = message.name;
        const userMessage = { [userName]: message.message };
        const assistantMessage = { "Assistant": message.reply };
        messages.push(assistantMessage);
        messages.push(userMessage);
    }
    ;
    messages.reverse();
    if (messages.length > 0)
        console.log(messages);
    return messages;
}
exports.default = getAllMessages;
;
