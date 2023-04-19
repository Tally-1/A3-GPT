

// Defines the data of a roleplay message

export default
class RpMessage{
    content: string;
    speaker: string;
    nodeTime: number;
    ingameTime: number[];

    constructor(content:string, speaker:string, ingameTime?:number[]){
        
        if(ingameTime === undefined){ingameTime = [2035,6,6,12,0];};

        this.content = content;
        this.speaker = speaker;
        this.nodeTime = new Date().getTime();
        this.ingameTime = ingameTime;
    }
}