import path from "path";
import fs from "fs";
import { RpConvoLight } from "../../../misc/interfaces";
import RpConvo from "../../classes/RpConvo";

// Loads a roleplay conversation from the filesystem

export default
 function getConversation(
    talkerId:string, 
    listenerId:string, 
    ingameTime:number[], 
    situation:string, 
    location:string,
    dataFolder:string
    ){
        const convoFolder      = path.join(dataFolder, "conversations", "convoFiles");
        const allConversations = fs.readdirSync(convoFolder); 
        const fileName = `${talkerId} && ${listenerId}.json`;
        
        if(!allConversations.includes(fileName)){
            const newConvo = new RpConvo(talkerId, listenerId, dataFolder, ingameTime, situation, location);
            return newConvo;
        };

        const conversation = require(path.join(convoFolder, fileName)) as RpConvoLight;
        const convo = new RpConvo(talkerId, listenerId, dataFolder, ingameTime, situation, location, conversation);

        return convo;        
    }