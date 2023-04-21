import fs from "fs";
import path from "path";
import GptMessage from "./GptMessage";
import addMessage from "../methods/GptConvo/addMessage";
import getAllMessages from "../methods/GptConvo/getAllMessages";

// dataobject representing a conversation between the user and GPT-3 / davinchi
export default
class GptConvo {
    "userId":string;
    "messages":GptMessage[];

    //the constructor looks for a stored conversation file and loads it if it exists
    // if it doesn't exist, it creates a new conversation object
    constructor(uid: string, dataFolder:string) {
        const fileName       = uid+".json";
        const gptConvoFolder = path.join(dataFolder, "conversations", "assistant");
        const gptConvoFile   = path.join(gptConvoFolder, fileName);
        
        let gptConvo = {
            "userId":uid,
            "messages":[] as GptMessage[]
        } as GptConvo;
    
        if(fs.existsSync(gptConvoFile)){gptConvo = require(gptConvoFile) as GptConvo;};

        this.userId = uid as string;
        this.messages = gptConvo.messages as GptMessage[];
    };

    addMessage     = addMessage;
    getAllMessages = getAllMessages;
    
};

