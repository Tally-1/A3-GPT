import { profileRequestData } from "../../../misc/interfaces";
import MapData, { mapDataArr } from "../../classes/MapData";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RequestManager from "../../classes/RequestManager";
import RpChat from "../../classes/RpChat";
import RpProfile from "../../classes/RpProfile";


export default
async function onNewRequest (this:RequestManager, request:string[]){
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
        
        
        else{
            console.log("Request type not recognized: "+type);
            this.emit('request-unknown', request);
        };
    };