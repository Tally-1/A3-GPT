import { stringObj } from "../../misc/interfaces";


// Defines the health of a infantry unit based on ingame data.
// See: https://community.bistudio.com/wiki/getAllHitPointsDamage

export default
class StatusHealth{
    ["health"]:string;
    ["incapacitation"]?:string;
    ["injuries"]?:{
        ["face"]?:string;
        ["neck"]?:string;
        ["head"]?:string;
        ["pelvis"]?:string;
        ["abdomen"]?:string;
        ["diaphragm"]?:string;
        ["chest"]?:string;
        ["body"]?:string;
        ["arms"]?:string;
        ["hands"]?:string;
        ["legs"]?:string;
    };

    constructor(healthData:healthDataArr){
        const parts         = ["face","neck","head","pelvis","abdomen","diaphragm","chest","body","arms","hands","legs","incapacitated", "generic"];
        const health = (1- healthData[12])*100+"%";
        const incapacitation   = healthData[11];
        
        this["health"]=health;
        this["injuries"]={};
        
        if(incapacitation > 0){
            this["incapacitation"] = Math.round((incapacitation)*100)+"%";
        };
        
        let i = 0;
        for (const bodypart of parts) {
            const damage = healthData[i];
                if(damage > 0){
                const value = Math.round((damage)*100)+"%";
                const status = {} as stringObj;
                status["damage"] = value;
                //@ts-ignore // Sometimes I just give up on typescript (this is one of those times)
                this["injuries"][bodypart] = status;
                if(i==10){break}
            }
            i++;
        };
        
    };
};

type healthDataArr = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];