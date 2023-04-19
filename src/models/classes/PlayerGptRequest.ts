import { playerIdentity } from "../../misc/interfaces";
import PlayerStatus from "./PlayerStatus";
import sendRequest from "../methods/PlayerGptRequest/sendRequest";
import replyFilter from "../methods/PlayerGptRequest/replyFilter";
import buildPrompt from "../methods/PlayerGptRequest/buildPrompt";


// instantiates a player request to the gpt3
// it has two methods:
// buildPrompt: builds a prompt based on the input-data.
// sendRequest: sends the prompt to the gpt3

export default 
class  PlayerGptRequest{
    requestId:string;
    requestType:string;
    requestTime:number;
    worldName:string;
    date:number[];
    message:string;
    player:playerIdentity;
    status:PlayerStatus;

    constructor(request:any){
        const requestId  = request["0"] as string;
        const requesttype= request["1"] as string;
        const msg        = request["2"] as string;
        const statusData = request["3"] as string;
        const [worldName, date, status] = statusData;
        const [uid, profileId, name] = status;
        const playerStatus = new PlayerStatus(status);
        const player = {
            "uid":uid,
            "profileId":profileId,
            "name":name
        };
        
        this.requestId = requestId;
        this.requestType = requesttype;
        this.requestTime = Date.now();
        this.worldName = worldName;
        this.date = date as unknown as number[];
        this.message = msg;
        this.player = player;
        this.status = playerStatus;
    };


    sendRequest = sendRequest;
    buildPrompt = buildPrompt;
    
    static replyFilter = replyFilter;

};