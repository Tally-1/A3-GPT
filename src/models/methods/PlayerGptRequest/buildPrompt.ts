import path from "path";
import fs from "fs";
import { profile, infStatus } from "../../../misc/interfaces";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RpProfile from "../../classes/RpProfile";
import StatusHealth from "../../classes/StatusHealth";
import Soldier from "../../classes/Soldier";
import MapData from "../../classes/MapData";

// This method builds a prompt for GPT-3 to generate a response to a player's message
// It is used in the PlayerGptRequest class
// There is still a lot of work to be done on this method, so please excuse the mess.
// I am commenting out some code, because I am still learning how to prompt
// GPT-3 in a way that produces the desired outcome.


export default
function buildPrompt(
    this:PlayerGptRequest, 
    previousMessages:string[],
    dataFolder:string
    ){
        const {worldName, status, date, message, player} = this;
        const {name, uid, profileId} = player;
        const {position, location} = status;
        
        const conversation = messageString(previousMessages);
        const mapsFolder   = path.join(dataFolder, "maps");
        const mapData      = fs.readFileSync(path.join(mapsFolder, worldName+".json")) as any as string;
        
        const includeHealthData    = healthDataNeeded(conversation, message, status.health);
        const includeSquadData     = squadDataNeeded(conversation, message, status.squadMembers);
        const includeEquipmentData = equipmentDataNeeded(conversation, message);
        const includeMapData       = mapDataNeeded(conversation, message, mapData);
        
        // const examplePos = [position[0], position[1]+100, position[2]];
    
        let   pr0file = {} as expandedProfile;
    
        // if(profileId !== ""){pr0file = RpProfile.getRpProfileFromId(profileId, dataFolder)};
        // let mapdataNeeded = false;
        // pr0file["status"] = status;
    
        // const JSONprofile = JSON.stringify(pr0file, null, 2);
        console.log(date);
    
        let prompt   = `You are a AI assistant for ${name} a player in the game Arma 3.\n`
                     + `The game is taking place at ${worldName}.\n`
                     + `The date is [${date}].\n`
                     + `The time is [${date[0]}:${date[1]}].\n`

                    // map data
                    if(includeMapData){
            prompt   += `The unit for measuring distance between 2 coordinates is meters.\n`
                     + `If the distance is over 1000 meters, the unit is kilometers.\n`
                     + `If asked where something is, you should respond with the distance and direction relative to ${name}.\n`
                     + `Use this data to find locations: ${mapData}\n`
                     + `${name} location is ${location}.\n`
                     + `${name} position is ${position}.\n`
                     + `The X coordinate is listed first, the Y coordinate is second.`
                     + `The higher the X coordinate, the further east the location is.`
                     + `The higher the Y coordinate, the further north the location is.`
                    }
                    else {prompt += `${name} location is ${location}.\n`};
                        
                    if(includeHealthData)    prompt += `${name}'s health is: ${JSON.stringify(status.health)}.\n`
                    if(includeSquadData)     prompt += `${name}'s squad members are: ${JSON.stringify(status.squadMembers)}.\n`
                    if(includeEquipmentData) prompt += `${name}'s equipment is: ${JSON.stringify(status.equipment)}.\n`
                    
                    if(previousMessages.length > 0){
                        prompt += `\n\nThis is the conversation so far:\n`
                               +  `${conversation}\n`
                    };

            prompt   +=  `${name} said: ${message}\n`
                     + `Respond as the Ai assistant.\n`
                     + `Respond with less than 100 words.\n`
                     

        return prompt;
}

interface expandedProfile extends profile{
    "status":infStatus
};

function mapDataNeeded(conversation:string, userMessage:string, mapData:string){
    const mapObj = JSON.parse(mapData) as MapData;
    const keyWords = [
        "map",
        "maps",
        "location",
        "how far",
        "how close",
        "how long",
        "get to",
        "distance",
        "direction",
        "directions",
        "how big",
        "navigate",
        "route",
        "destination",
        "travel",
        "terrain",
        "coordinates",
        "landmarks",
        "local area",
        "city",
        "town",
        "village",
        "world",
        "street",
        "north",
        "south",
        "east",
        "west"
    ];

    for (const location of mapObj.locations) {
        keyWords.push(location.name);
    };

    const mapDataNeeded = keyWords.some((keyWord)=>{
        return  conversation.toLowerCase().includes(keyWord.toLowerCase()) || 
                userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });

    return mapDataNeeded;

};

function equipmentDataNeeded(conversation:string, userMessage:string){
    const keyWords = [
        "my equipment",
        "my gear",
        "my loadout",
        "my inventory",
        "my stuff",
        "my weapons",
        "my weapon",
        "items",
        "ammo",
        "magazine",
        "magazines",
        "grenade",
        "backpack",
        "vest",
        "uniform",
        "helmet",
        "headgear",
        "facewear",
        "first aid kit",
        "rifle",
        "pistol",
        "launcher",
        "clothing",
        "handgun",
        "my status"
    ];

    const equipmentDataNeeded = keyWords.some((keyWord)=>{
        return  conversation.toLowerCase().includes(keyWord.toLowerCase()) || 
                userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });

    
    return equipmentDataNeeded;
};

function healthDataNeeded(conversation:string, userMessage:string, status:StatusHealth){ 
    const keyWords = [
        "my health", 
        "my hp",
        "my status",
        "injuries",
        "wounds",
        "my condition",
        "health condition",
        "medical status",
        "physical condition",
        "vital signs"
    ];

    const healthDataNeeded = keyWords.some((keyWord)=>{ 
        return  conversation.toLowerCase().includes(keyWord.toLowerCase()) || 
                userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });

    if(healthDataNeeded) return true;
    if(status.health !== '100%') return true;
    //@ts-ignore
    if(Object.keys(status.injuries).length > 0) return true;


    return false;

}

function squadDataNeeded(conversation:string, userMessage:string, squadMembers:Soldier[]){
    const keyWords = [
        "my squad", 
        "my group", 
        "my team", 
        "my status",
        "squadMembers", 
        "groupMembers", 
        "teamMembers",
        "squad members",
        "group members",
        "team members"
    ];

    for (const soldier of squadMembers) {
        keyWords.push(soldier.name);
    };

    const squadDataNeeded = keyWords.some((keyWord)=>{
        return  conversation.toLowerCase().includes(keyWord.toLowerCase()) || 
                userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });
    return squadDataNeeded;
};

function messageString(messages:any[]){
const messageString = messages.map((message:any)=>{
    const name = Object.keys(message)[0];
    const text = message[name];
    return `${name}: ${text}\n`;
});
return messageString.join("");
}