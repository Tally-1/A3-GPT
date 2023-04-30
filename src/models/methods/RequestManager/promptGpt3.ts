import path from "path";
import sleep from "../../../misc/sleep";
import RequestManager from "../../classes/RequestManager";

const red = "\x1b[31m";
const reset = "\x1b[0m";
// This method prompts the gpt3 (the cheapest of the usable models) with a prompt.

export default
async function promptGpt3(
  prompt:string, 
  apiKey:string,
  model:string = "gpt-3.5-turbo",
  requestManager?:RequestManager
  
  ) {
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
          }],
      });
      
      const reply = completion.data.choices[0].message.content;
      
      return reply;
    } catch (error) {
      console.log(prompt);
      console.log("error prompt gpt-3: " + error);//@ts-ignore

      if(error.code === 429){
        console.log(red+"429 error"+reset+"\n Too many requests at the same time.\n Waiting 5 seconds before retrying");
        await sleep(5000);
        const reply = await promptGpt3(prompt, apiKey, model) as string;
        return reply;
      };
      
      //@ts-ignore
      return error.message;
    }
  };
