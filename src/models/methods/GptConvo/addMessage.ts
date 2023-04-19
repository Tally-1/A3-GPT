import path from "path";
import fs from "fs";
import GptConvo from "../../classes/GptConvo";
import GptMessage from "../../classes/GptMessage";

// This method adds a message to the conversation object and saves it to a file

export default
function addMessage(
    this: GptConvo, 
    message:GptMessage,
    dataFolder:string
    ){
    this.messages.push(message);
    const fileName = this.userId+".json";
    
    const gptConvoFile = path.join(dataFolder, "conversations", "assistant", fileName);
    fs.writeFileSync(gptConvoFile, JSON.stringify(this, null, 2));
};