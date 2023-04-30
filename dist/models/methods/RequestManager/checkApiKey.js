"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("../../../misc/logColors");
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";
async function checkApiKey() {
    const { apiKey } = this;
    if (apiKey === "sk-apiKey (https://platform.openai.com/account/api-keys)") {
        console.log(logColors_1.blue + "A3GPT: " + reset + red + " API key not set. " + reset + "\nPlease set your API key in" + green + " DCO-config.cfg" + reset + "\n");
        console.log(yellow + "Exiting..." + reset);
        process.exit(1);
    }
    ;
    const prompt = ` Are you online?`;
    console.log(logColors_1.blue + "A3GPT: " + reset + yellow + "Checking API key..." + reset);
    const response = await RequestManager_1.default.promptGpt3(prompt, apiKey);
    if (response.includes("401")) {
        console.log(cyan + "\nA3GPT:" + reset + red + " API key invalid. " + reset + "\nPlease set your API key in" + green + " DCO-config.cfg" + reset + "\n");
        console.log(yellow + "Exiting..." + reset);
        process.exit(1);
    }
    ;
    if (response.includes("402")) {
        console.log(logColors_1.blue + "\nOpen AI:" + reset + red + " Pay yo bills bwah!. " + reset + "\nOpen AI reports a billing issue with your account.");
        console.log(yellow + "Exiting..." + reset);
        process.exit(1);
    }
    ;
    let logMsg = logColors_1.blue + "A3GPT: " + reset + green + "API key seems to be valid\n" + reset;
    if (response.includes("error")) {
        logMsg = red + "\n" + response.error.message + "\n" + reset;
    }
    ;
    console.log(logMsg);
}
exports.default = checkApiKey;
