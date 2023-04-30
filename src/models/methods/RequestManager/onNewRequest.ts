import { profileRequestData } from "../../../misc/interfaces";
import { red, reset } from "../../../misc/logColors";
import MapData, { mapDataArr } from "../../classes/MapData";
import PlayerGptRequest from "../../classes/PlayerGptRequest";
import RequestManager from "../../classes/RequestManager";
import RpChat from "../../classes/RpChat";
import RpProfile from "../../classes/RpProfile";


export default
async function onNewRequest (this:RequestManager, request:string[]){
        const type = request[1];

        if(type === "roleplay-chat"){
            try{
                new RpChat(request).sendRpChat(this);
                console.log("Roleplay chat request sent");

            }catch(error){

                console.log(red+"Error on roleplay chat request: "+reset+error);
                console.log("Error logged to 'data\\errors\\badRequests.json'\n");
                
                RequestManager.logRequestFail(request.toString(), type, error, false);
            };
            
        }
        
        else if(type === "assign-profile"){
            try {
                const rq = request as unknown as profileRequestData;
                await RpProfile.assignNewProfile(rq, this);

            }catch(error){

                console.log(red+"Error on assign new profile request: "+reset+error);
                console.log("Error logged to 'data\\errors\\badRequests.json'\n");
                RequestManager.logRequestFail(request.toString(), type, error, false);
            };
            
        }


        else if(type === "player-gpt"){
            try {
                new PlayerGptRequest(request).sendRequest(this);}catch(error){
                console.log(error);
                console.log(red+"Error on GPT assistant request: "+reset+error);
                console.log("Error logged to 'data\\errors\\badRequests.json'\n");
                RequestManager.logRequestFail(request.toString(), type, error, false);
            };
            
        }


        else if(type === "map-data"){
            const mapData = request as unknown as mapDataArr
            try {new MapData(mapData).storeMapData(this);}catch(error) {

                console.log(red+"Error storing map data: "+reset+error);
                console.log("Error logged to 'data\\errors\\badRequests.json'\n");
                RequestManager.logRequestFail(request.toString(), type, error, false);
            };
            
        }
        else{
            console.log("Request type not recognized: "+type);
            this.emit("request-"+type, request);
        };
    };