import axios from "axios";
import path from "path";

// const config = require(path.join(__dirname, "/../../../../../a3.gpt-config.json"));
// const {apiKey} = config;

// Sends a request to the OpenAI API and returns the generated text.
// this method allows for more models than the promptGpt3 method.

export default
async function openAiCompletion(
    prompt:string, 
    engine:string ="text-curie-001", 
    apiKey:string,
    maxTokens:number=100,
    logText:boolean=false,
    randomness:number=0
    ) {
    
     console.log("prompt-size: "+prompt.length);

    const endpoint = "https://api.openai.com/v1/engines/"+engine+"/completions";
    

    const requestParams = {
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: randomness,
      };

    const response = await axios.post(endpoint, requestParams, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      });

    const generatedText = response.data.choices[0].text;
    
    if(logText===true){console.log(generatedText)};

    return generatedText;

};