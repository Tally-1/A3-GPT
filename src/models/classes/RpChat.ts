import validProfiles from "../methods/RpChat/validProfiles";
import formatReply from "../methods/RpChat/formatReply";
import generatePrompt from "../methods/RpChat/generatePrompt";
import sendRpChat from "../methods/RpChat/sendRpChat";


//Handles all roleplay chat requests

export default
class RpChat {
    id: string;
    type: string;
    userInput: string;
    talkerId: string;
    listenerId: string;
    situation: string;
    location: string;
    ingameTime: number[];
    gptModel?: string;

  
    constructor(request:string[]){
        const [id, type, userInput, talkerId, listenerId, situation, location, ingameTime, gptModel] = request;
        const time = new Date().getTime();
        this.id = id;
        this.type = type;
        this.userInput = userInput;
        this.talkerId = talkerId;
        this.listenerId = listenerId;
        this.situation = situation;
        this.location = location;
        this.ingameTime = ingameTime as unknown as number[];
        this.gptModel = gptModel;

        // console.log();
    }

    validProfiles  = validProfiles;
    formatReply    = formatReply;
    generatePrompt = generatePrompt;
    sendRpChat     = sendRpChat;

};