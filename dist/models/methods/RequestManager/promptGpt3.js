"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function promptGpt3(prompt, apiKey, model = "gpt-3.5-turbo") {
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
        console.log("error prompt gpt-3: " + error);
        return error.message;
    }
}
exports.default = promptGpt3;
;
