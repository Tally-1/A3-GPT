import { RpConvoLight } from "../../misc/interfaces";
import RpMessage from "./RpMessage";
import getConversation from "../methods/RpConvo/getConversation";
import save from "../methods/RpConvo/save";
import stringMessages from "../methods/RpConvo/stringMessages";


// Defines a roleplay conversation between a player and the AI

export default
class RpConvo { 
    fileName: string;
    participants: string[];
    situation: string;
    location: string;
    irlTimeFirst: number;
    irlTimeLast: number;
    gameTimeFirst: number[];
    gameTimeLast: number[];
    messages: RpMessage[];

    constructor(
        idTalker:string, 
        idListener:string,
        dataFolder:string,
        gameTime?:number[],
        situation?:string, 
        location?:string,
        previousConvo?:RpConvoLight
    ){
        const fileName = `${idTalker} && ${idListener}.json`;
        if(previousConvo !== undefined){
            this.fileName = fileName;
            this.participants = previousConvo.participants;
            this.situation = previousConvo.situation;
            this.location = previousConvo.location;
            this.irlTimeFirst = previousConvo.irlTimeFirst;
            this.irlTimeLast = new Date().getTime();
            this.gameTimeFirst = previousConvo.gameTimeFirst;
            this.gameTimeLast =  gameTime ? gameTime : [-1,-1,-1,-1,-1];
            this.messages = previousConvo.messages;
            return;
        };
        

        if(situation === undefined){situation = "unknown";};
        if(location === undefined){location = "unknown";};
        if(gameTime === undefined){gameTime = [2035,6,6,12,0];};

        this.fileName = fileName;
        this.participants = [idTalker, idListener];
        this.situation = situation;
        this.location = location;
        this.irlTimeFirst = new Date().getTime();
        this.irlTimeLast = new Date().getTime();
        this.gameTimeFirst = gameTime;
        this.gameTimeLast = gameTime;
        this.messages = [];

        this.save(dataFolder);

    } 

    save = save;
    stringMessages = stringMessages;

    static getConversation = getConversation;
};