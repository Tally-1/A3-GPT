"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function openAiCompletion(prompt, engine = "text-curie-001", apiKey, maxTokens = 100, logText = false, randomness = 0) {
    console.log("prompt-size: " + prompt.length);
    const endpoint = "https://api.openai.com/v1/engines/" + engine + "/completions";
    const requestParams = {
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: randomness,
    };
    const response = await axios_1.default.post(endpoint, requestParams, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
    });
    const generatedText = response.data.choices[0].text;
    if (logText === true) {
        console.log(generatedText);
    }
    ;
    return generatedText;
}
exports.default = openAiCompletion;
;
