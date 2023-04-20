"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
const RpConvo_1 = __importDefault(require("../../classes/RpConvo"));
const RpMessage_1 = __importDefault(require("../../classes/RpMessage"));
async function sendRpChat(rqMngr, model = "gpt3") {
    const { id, userInput, type, ingameTime, talkerId, listenerId, situation, location } = this;
    const { profileProcessing, iniDbi2Path, dataFolder, GPT3PromptTimes, apiKey } = rqMngr;
    const responseType = "response-" + type;
    if (userInput.trim() === "") {
        RequestManager_1.default.sendA3Request(responseType, id, "Write actual words maan, not just spaces.", iniDbi2Path);
        return;
    }
    ;
    if (!this.validProfiles(dataFolder)) {
        RequestManager_1.default.sendA3Request(responseType, id, "invalid sentence", iniDbi2Path);
    }
    ;
    const time = new Date().getTime();
    const conversation = RpConvo_1.default.getConversation(talkerId, listenerId, ingameTime, situation, location, dataFolder);
    const { prompt, listener } = this.generatePrompt(conversation, dataFolder);
    let reply = "This is a stand-in reply";
    if (model === "gpt3"
        && (!profileProcessing)
        && rqMngr.avgPromptTime() < 10000) {
        reply = await RequestManager_1.default.promptGpt3(prompt, apiKey);
        GPT3PromptTimes.push(new Date().getTime() - time);
    }
    else {
        RequestManager_1.default.sendA3Request("debug-message", "1", "Using Davinchi to respond. GPT-3 is taking too long.", rqMngr.iniDbi2Path);
        reply = await RequestManager_1.default.openAiCompletion(prompt, "text-davinci-002", apiKey);
        rqMngr.GPT3PromptTimes.push(new Date().getTime() - time);
        model = "davinci";
        console.log("Davinci used");
    }
    ;
    if (rqMngr.GPT3PromptTimes.length > 10) {
        rqMngr.GPT3PromptTimes.shift();
    }
    ;
    const formattedReply = this.formatReply(listener, reply);
    const responseTime = new Date().getTime() - time;
    console.log("model: ", model);
    console.log("Prompt-size", prompt.length);
    console.log("Response time: " + responseTime + "ms");
    RequestManager_1.default.sendA3Request(responseType, id, formattedReply, iniDbi2Path);
    const userMessage = new RpMessage_1.default(userInput, talkerId, ingameTime);
    const botMessage = new RpMessage_1.default(formattedReply, listenerId, ingameTime);
    conversation.save(dataFolder, userMessage, botMessage);
}
exports.default = sendRpChat;
;
