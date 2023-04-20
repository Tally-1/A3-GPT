import RequestManager from "../../classes/RequestManager";
import RpChat from "../../classes/RpChat";
import RpConvo from "../../classes/RpConvo";
import RpMessage from "../../classes/RpMessage";


// This method sends a roleplay chat request to the GPT-3 API
// Then saves it and sends a request to the Arma 3 server, containing the reply from the API.
// The request will be sent to GPT-3 or Davinchi, depending on the model parameter.

export default
async function sendRpChat(
    this:RpChat,
    rqMngr:RequestManager,
    model:string = "gpt3"
    ){
    const {id, userInput, type, ingameTime, talkerId, listenerId, situation, location} = this;
    const {profileProcessing, iniDbi2Path, dataFolder, GPT3PromptTimes, apiKey}  = rqMngr;
    const responseType = "response-"+type;
    
    if(userInput.trim() === ""){
        RequestManager.sendA3Request(responseType, id, "Write actual words maan, not just spaces.", iniDbi2Path);
        return;
    };
    if(!this.validProfiles(dataFolder)){
        RequestManager.sendA3Request(responseType, id, "invalid sentence", iniDbi2Path);
    };
    
    const time               = new Date().getTime();
    const conversation       = RpConvo.getConversation(talkerId, listenerId, ingameTime, situation, location, dataFolder);
    const {prompt, listener} = this.generatePrompt(conversation, dataFolder);
    
    let reply = "This is a stand-in reply";

    //whenever possible, use GPT-3, but if it's taking too long, use Davinchi (10x faster)
    if(model === "gpt3" 
    && (!profileProcessing)
    && rqMngr.avgPromptTime() < 10000){

        reply = await RequestManager.promptGpt3(prompt, apiKey);
        GPT3PromptTimes.push(new Date().getTime() - time);        
    } 
    else{

        RequestManager.sendA3Request("debug-message", "1", "Using Davinchi to respond. GPT-3 is taking too long.", rqMngr.iniDbi2Path);

        reply = await RequestManager.openAiCompletion(prompt, "text-davinci-002", apiKey);
        rqMngr.GPT3PromptTimes.push(new Date().getTime() - time);
        model = "davinci";
        console.log("Davinci used");
    };

    if(rqMngr.GPT3PromptTimes.length > 10){rqMngr.GPT3PromptTimes.shift()};
    const formattedReply = this.formatReply(listener, reply);

    const responseTime = new Date().getTime() - time;
    console.log("model: ", model);
    console.log("Prompt-size", prompt.length);
    console.log("Response time: "+responseTime+"ms");
    
    RequestManager.sendA3Request(responseType, id, formattedReply, iniDbi2Path);
    
    const userMessage = new RpMessage(userInput, talkerId, ingameTime);
    const botMessage  = new RpMessage(formattedReply, listenerId, ingameTime);
    conversation.save(dataFolder, userMessage, botMessage);
};