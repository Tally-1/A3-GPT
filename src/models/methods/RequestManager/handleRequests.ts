import { profileRequestData } from "../../../misc/interfaces";
import MapData, { mapDataArr } from "../../classes/MapData";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RequestManager from "../../classes/RequestManager";
import RpChat from "../../classes/RpChat";
import RpProfile from "../../classes/RpProfile";

// This method executes the requests in the A3-GPT_out file
// May be changed for a event based system in the future.

export default
async function handleRequests(this:RequestManager){
    const allRequests = this.getRequests();
    for (const request of allRequests) { 
        const type = request[1];

        if(type === "roleplay-chat"){
            new RpChat(request).sendRpChat(this);
            console.log("Roleplay chat request sent");
        }
        
        else if(type === "assign-profile"){
            const rq = request as unknown as profileRequestData
            await RpProfile.assignNewProfile(rq, this);
        }


        else if(type === "player-gpt"){
            new PlayerGptRequest(request).sendRequest(this);
        }


        else if(type === "map-data"){
            const mapData = request as unknown as mapDataArr
            new MapData(mapData).storeMapData(this);
        }
        
        
        else{console.log("Request type not recognized: "+type);};
    };

    if(allRequests.length > 0){
        try {
            this.clearIniFile("A3-GPT_out", this.iniDbi2Path);
        }catch(e){}
        
    };
}