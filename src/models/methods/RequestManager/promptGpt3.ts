import path from "path";


// This method prompts the gpt3 (the cheapest of the usable models) with a prompt.

export default
async function promptGpt3(
  prompt:string, 
  apiKey:string,
  model:string = "gpt-3.5-turbo", 
  
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
      console.log("error prompt gpt-3: " + error);//@ts-ignore
      return error.message;
    }
  };