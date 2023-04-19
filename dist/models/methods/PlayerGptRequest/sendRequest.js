"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GptConvo_1 = __importDefault(require("../../classes/GptConvo"));
const GptMessage_1 = __importDefault(require("../../classes/GptMessage"));
const PlayerGptRequest_1 = __importDefault(require("../../classes/PlayerGptRequest"));
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
async function sendRequest(rqMngr) {
    const { dataFolder, apiKey, iniDbi2Path, GPT3PromptTimes, profileProcessing, avgPromptTime } = rqMngr;
    const { requestId, requestType } = this;
    const currentConvo = new GptConvo_1.default(this.player.uid, dataFolder);
    const messages = currentConvo.getAllMessages();
    const prompt = this.buildPrompt(messages, dataFolder);
    const time = new Date().getTime();
    const startTime = Date.now();
    let reply = "The player is currently at " + this.status.location + ".\n";
    let modelUsed = "gpt3";
    if ((!profileProcessing)
        && avgPromptTime() < 10000) {
        reply = await RequestManager_1.default.promptGpt3(prompt, apiKey);
        GPT3PromptTimes.push(new Date().getTime() - time);
    }
    else {
        RequestManager_1.default.sendA3Request("debug-message", "1", "Using Davinchi to respond. GPT-3 is taking too long.", iniDbi2Path);
        reply = await RequestManager_1.default.openAiCompletion(prompt, "text-davinci-002", apiKey);
        console.log("Davinci used");
        let modelUsed = "davinci";
        GPT3PromptTimes.push(new Date().getTime() - time);
    }
    ;
    if (GPT3PromptTimes.length > 10) {
        GPT3PromptTimes.shift();
    }
    ;
    const responseTime = Date.now() - startTime;
    const message = new GptMessage_1.default(prompt, this, reply, startTime, responseTime);
    const parsedReply = PlayerGptRequest_1.default.replyFilter(reply);
    message.model = modelUsed;
    const responseType = "response-" + requestType;
    RequestManager_1.default.sendA3Request(responseType, requestId, parsedReply, iniDbi2Path);
    currentConvo.addMessage(message, dataFolder);
}
exports.default = sendRequest;
;
