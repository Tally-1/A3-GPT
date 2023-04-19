import path from "path";
import fs from "fs";
import { profile, infStatus } from "../../../misc/interfaces";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RpProfile from "../../classes/RpProfile";

// This method builds a prompt for GPT-3 to generate a response to a player's message
// It is used in the PlayerGptRequest class
// There is still a lot of work to be done on this method, so please excuse the mess.
// Mainly filtering the data to be used in the prompt.


export default
function buildPrompt(
    this:PlayerGptRequest, 
    previousMessages:string[],
    dataFolder:string
    ){
        const {worldName, status, date, message, player} = this;
        const {name, uid, profileId} = player;
        const {position, location} = status;
        
    
        const mapsFolder = path.join(dataFolder, "maps");
        const mapData    = fs.readFileSync(path.join(mapsFolder, worldName+".json"));
        const examplePos = [position[0], position[1]+100, position[2]];
    
        let   pr0file = {} as expandedProfile;
    
        if(profileId !== ""){pr0file = RpProfile.getRpProfileFromId(profileId, dataFolder)};
        // let mapdataNeeded = false;
        // pr0file["status"] = status;
    
        // const JSONprofile = JSON.stringify(pr0file, null, 2);
    
        let prompt = `You are a AI assistant for ${name} a player in the game Arma 3.\n`
                    // map data
                     + `The unit for measuring distance between 2 coordinates is meters.\n`
                     + `For example: the distance between [0,0,0] and [0,1,0] is 1 meters.\n`
                     + `If the distance is over 1000 meters, the unit is kilometers.\n`
                     + `If asked where something is, you should respond with the distance and direction relative to ${name}.\n`
                    //  + `Use The Pythagorean theorem to calculate the distance between 2 coordinates.\n`
                     + `Use this data to find locations: ${mapData}\n`
                     + `${name} is at ${location}.\n`
                     + `for example: ${name} is at ${position} and asks where the Kyle ${examplePos} is, the answer is 100m north.\n`
                     //user data
                    //  + `This is ${name}'s data  ${pr0file}.\n`
                     + `The game is taking place at ${worldName}.\n`
                     + `The time is [${date}].\n`
                     + `${name} asked you: ${message}\n`
                     + `Respond with less than 100 words.\n`
                     
                     
        
        // if(messages.length > 0){
        //     prompt += `This is the conversation so far:\n`
        //     for (const message of messages) {prompt += message+"\n";}
        // }

        return prompt;
}

interface expandedProfile extends profile{
    "status":infStatus
};