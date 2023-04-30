"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = __importDefault(require("../../../misc/sleep"));
const red = "\x1b[31m";
const reset = "\x1b[0m";
async function promptGpt3(prompt, apiKey, model = "gpt-3.5-turbo", requestManager) {
    try {
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: model,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
        });
        const reply = completion.data.choices[0].message.content;
        return reply;
    }
    catch (error) {
        console.log(prompt);
        console.log("error prompt gpt-3: " + error);
        if (error.code === 429) {
            console.log(red + "429 error" + reset + "\n Too many requests at the same time.\n Waiting 5 seconds before retrying");
            await (0, sleep_1.default)(5000);
            const reply = await promptGpt3(prompt, apiKey, model);
            return reply;
        }
        ;
        return error.message;
    }
}
exports.default = promptGpt3;
;
