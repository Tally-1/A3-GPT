import path           from "path";
import fs             from "fs";
import RpConvo        from "../../classes/RpConvo";
import RpChat         from "../../classes/RpChat";
import MapData        from "../../classes/MapData";
import { profile }    from "../../../misc/interfaces";
import RequestManager from "../../classes/RequestManager";
const profilesFolder  = path.join(__dirname, "../../../../data/profiles/files");

// Generates a prompt for the GPT-3 API based on the input-data.

export default
function generatePrompt(
    this:RpChat,
    conversation:RpConvo,
    dataFolder:string
){
    const {userInput, ingameTime, talkerId, listenerId, situation, location} = this;
    
    const talkerProfile   = require(path.join(profilesFolder, talkerId+".json")) as profile;
    const listenerProfile = require(path.join(profilesFolder, listenerId+".json")) as profile;
    //Messages older than 5 minutes are ignored
    const msgTimeOut      = 1000*300;
    const msgString       = conversation.stringMessages(msgTimeOut, dataFolder);
    const talker          = talkerProfile.name;
    const listener        = listenerProfile.name;
    const stringTalker    = JSON.stringify(talkerProfile);
    const stringListener  = JSON.stringify(listenerProfile);

    const map             = location.split("(")[1].replace(")", "");
    const mapData         = require(path.join(__dirname, "../../../../data/maps/"+map+".json"));
    const wordCount       = defineWordCount(listenerProfile);
    const includeMapData  = includeMapdata(userInput, msgString, mapData);


    let prompt =  `profile player: ${stringTalker}\n`
                 +`profile AI: ${stringListener}\n\n`
                 if(includeMapData){ 
                    prompt +=`If asked where something is, you should respond with the distance and direction relative to ${talker}.`
                           + `The unit for measuring distance between 2 coordinates is meters.\n`
                           + `For example: the distance between [0,0,0] and [0,1,0] is 1 meter north.`
                           + `If the distance is over 1000 meters, the unit is kilometers.\n`
                           + `Use this data to find locations: ${JSON.stringify(mapData)}\n`
                };
        prompt  +=`This is a conversation between ${talker} and ${listener} as characters in Arma 3 (described in the profiles above).\n`
                 + `${situation.replace(/<br\s*\/?>/gm, "\n")}`
                 + `This conversation is taking place at ${location}:\n`
                 + `The date is [${ingameTime}] (year,month,day,hour,minute).\n`
                 if(msgString.length > 10) prompt += `${msgString}\n`;
        prompt  += `${talker} says: '${userInput}' to ${listener}.\n`
                 + `You are ${listener}.\n`
                 + `Reply as ${listener}.\n`
                //  + `Do not include " chars in the reply.\n`
                 + `Do not describe ${listener}, just speak as you are him. Your reply will be relayed using TTS.\n`
                 + `Use less than ${wordCount} words.\n`
                 
        console.log(prompt);
        
    return {prompt, listener};

};

function includeMapdata(userInput:string, msgString:string, mapData:MapData){
    let include = false;
    const completeInput = (userInput + msgString).toLowerCase();
    const keyWords = [
        "map", 
        "location", 
        "area", 
        "place",
        "where",
        "how far",
        "get to",
        "get there"];

        for (const loc of mapData.locations) {
            keyWords.push(loc.name.toLowerCase());
        };

        for (const keyWord of keyWords) {
            if(completeInput.includes(keyWord)) include = true;
        };

    return include;
}

function defineWordCount(listenerProfile:profile){
    let wordCount = 100;
    if(listenerProfile.personality.includes("introvert")) wordCount = 50;
    if(listenerProfile.personality.includes("extrovert")) wordCount = 150;
    return wordCount;
};

//1000*60*60;//1 hour