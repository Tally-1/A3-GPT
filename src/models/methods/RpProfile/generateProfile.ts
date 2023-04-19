import RequestManager from "../../classes/RequestManager";


// Prompts open Ai to generate a profile for a character in the game Arma 3.

export default
async function generateProfile(
    knownData:string[], 
    log:boolean = false,
    apiKey:string
    ) {try {
    
    const [
      name, 
      language, 
      ethnicity, 
      faction, 
      role, 
      rank, 
      identifier
  ] = knownData;
    const age = Math.floor(Math.random() * (45 - 18 + 1) + 18);
    const isMarried = (age < 25) ? Math.random() < 0.05 : (age > 25) ? Math.random() < 0.5 : false;
    const maritalStatus = isMarried ? "married" : "single";
    const hasChildren = isMarried && (age > 30) ? Math.random() < 0.5 : false;

    let prompt =
  `I need profile data for a character in the game Arma 3.\n`
  +`Build a JSON file with the following structure:
  {
    \"id\":          \"${identifier}\",
    \"name\":        \"${name}\",
    \"language\":    \"${language}\",
    \"ethnicity\":   \"${ethnicity}\",
    \"faction\":     \"${faction}\",
    \"rank\":        \"${rank}\",
    \"role\":        \"${role}\",
    \"age\":         \"${age}\",

    \"religion\":       \"\",
    \"marital_status\": \"${maritalStatus}\",
    \"personality\":    \"\",
    \"story\":          \"\"
  }\n`
  
  +`Fill in the empty fields.\n`
  +`Do not use linebreaks in the fields.\n`
  +`Religion cannot be atheist.\n`
  if(hasChildren) prompt += `The character has children.\n`
  
    const reply = await //RequestManager.openAiCompletion(prompt, "text-davinci-002");
    RequestManager.promptGpt3(
      prompt,
      "gpt-3.5-turbo",
      apiKey
      ) as string;

    if(log) console.dir(JSON.parse(reply));
    return reply;
  
  } catch (error) {// @ts-ignore
    return ("error-"+error.message) as string;
  }
  };