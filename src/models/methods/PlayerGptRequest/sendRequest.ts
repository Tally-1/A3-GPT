import GptConvo from "../../classes/GptConvo";
import GptMessage from "../../classes/GptMessage";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RequestManager from "../../classes/RequestManager";

// This method sends a request to the GPT-3 API (open ai)
// Then saves it and sends a request to the Arma 3 server, containing the reply from the API.

export default
async function sendRequest(
    this:PlayerGptRequest,
    rqMngr:RequestManager,
    ){
    const {
        dataFolder, 
        apiKey, 
        iniDbi2Path, 
        GPT3PromptTimes,
        profileProcessing,
        avgPromptTime
    } = rqMngr;

    const {
        requestId, 
        requestType
    } = this;
   
    const currentConvo = new GptConvo(this.player.uid, dataFolder);
    const messages     = currentConvo.getAllMessages();
    const prompt       = this.buildPrompt(messages, dataFolder);
    const time         = new Date().getTime();

    const startTime = Date.now();
    let reply     = "The player is currently at "+this.status.location+".\n";
    let modelUsed = "gpt3";

    if((!profileProcessing)
    && avgPromptTime() < 10000){

        reply = await RequestManager.promptGpt3(prompt, apiKey);
        GPT3PromptTimes.push(new Date().getTime() - time);        
    }  
    else{

        RequestManager.sendA3Request("debug-message", "1", "Using Davinchi to respond. GPT-3 is taking too long.", iniDbi2Path);
       

        reply = await RequestManager.openAiCompletion(prompt, "text-davinci-002", apiKey);
        console.log("Davinci used");
        let modelUsed = "davinci"; 

        GPT3PromptTimes.push(new Date().getTime() - time);
    };

    if(GPT3PromptTimes.length > 10){GPT3PromptTimes.shift()};

    const responseTime = Date.now()-startTime;   
    const message      = new GptMessage(prompt, this, reply, startTime, responseTime);
    const parsedReply  = PlayerGptRequest.replyFilter(reply);
    message.model = modelUsed;

    const responseType = "response-"+requestType;
    RequestManager.sendA3Request(responseType, requestId, parsedReply, iniDbi2Path);
    
    currentConvo.addMessage(message, dataFolder);
    };