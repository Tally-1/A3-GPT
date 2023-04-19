import RpMessage from "../models/classes/RpMessage";

export
interface conversationEntry{
    "participants":[string, string],
    "fileName":    string,
    "node-time":   number
};

export
interface numObj {[key: string]: number};

export
interface stringObj {[key: string]: string};
export
interface bodypartList {[key: string]: stringObj};

export
interface conversationRegistry {[key: string]: conversationEntry};

export
type profileDataList = [string[]];

export
interface profile {
    "id": string,
    "name": string,
    "language": string[],
    "ethnicity": string,
    "faction": string,
    "rank": string[],
    "role": string,
    "age": number,
    "marital_status": string,
    "personality": string,
    "story":string
};

export
interface statusHealth{
    ["health"]:string;
    ["incapacitation"]?:string;
    ["face"]?:string;
    ["injuries"]?:{
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
   
}

export
interface equipmentObj{
    ["rifle"]:string;
    ["launcher"]:string;
    ["handgun"]:string;
    ["clothing"]:string;
    ["vest"]:string;
    ["headgear"]:string;
    ["facewear"]:string;
    ["items"]:string[];
    ["magazines"]:numObj;
    [key: string]: string | string[] | numObj;
}

export
interface infStatusObj{
    ["characterName"]: string,
    ["location"]: string,
    ["position"]: string,
    ["health"]: statusHealth,
    ["equipment"]: equipmentObj,
    ["squadMembers"]: squadMembObj[]
};

export
interface RpConvoLight {
    fileName: string;
    participants: string[];
    situation: string;
    location: string;
    irlTimeFirst: number;
    irlTimeLast: number;
    gameTimeFirst: number[];
    gameTimeLast: number[];
    messages: RpMessage[];
}

export
interface squadMembObj{
    ["name"]: string,
    ["position"]: string,
    ["health"]: statusHealth,
    ["equipment"]: reducEquipObj
};

export
interface reducEquipObj{
    ["rifle"]:string;
    ["launcher"]:string;
    ["handgun"]:string;
    ["vest"]:string;
    ["headgear"]:string;
    ["items"]:string[];
    [key: string]: string | string[] | numObj;
}

export
interface infStatus {
    name:string,
    location:string,
    position:number[],
    health:statusHealth,
    equipment:equipmentObj
}

export
interface playerIdentity {
    uid:string,
    profileId:string,
    name:string
}



export
interface profileList {[key: string]: string};


export
interface message {
    "content": string,
    "speaker": string,
    "node-time": number,
    "ingame-time": number[]
};

export
interface conversation {
    "fileName": string,
    "participants": [string, string],
    "situation": string,
    "location": string,
    "node-time-start": number,
    "node-time-last": number,
    "ingame-time-start": number[],
    "ingame-time-last": number[],
    "messages": message[]
};

export
type profileRequestData = [string, string, string[], string[]];