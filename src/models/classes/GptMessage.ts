import PlayerGptRequest from "./PlayerGptRequest";


// This class is used to store the data for a player -> GPT-3 message
// The data is used to improve prompts, response time and model selection
export default
class GptMessage{
    "name":string;
    "location":string;
    "position":number[];
    "message":string
    "reply":string;
    "model":string;
    "promptData":string[];
    "send-time":number;
    "responseTime":number;
    

    constructor(
        prompt:string, 
        playerRequest:PlayerGptRequest, 
        reply:string,
        startTime:number,
        responseTime:number,
        model:string="unknown"
    ){
        const name = playerRequest.player.name
        const message = playerRequest.message
        const location = playerRequest.status.location;
        const position = playerRequest.status.position;
    
        const promptSize = prompt.length + " characters";
        const promptWords = prompt.split(" ").length + " words";
        const promptTokens = Math.round(prompt.split(" ").length*0.75)+" - "+ prompt.length/2 + " tokens";

        this.name = name;
        this.location = location;
        this.position = position;
        this.message = message;
        this.reply = reply;
        this.model = model;
        this.promptData = [promptSize, promptWords, promptTokens];
        this.responseTime = responseTime;
        this["send-time"] = startTime;
    }
}