import path from "path";
import fs from "fs";
import RpConvo from "../../classes/RpConvo";
import RpMessage from "../../classes/RpMessage";

// Saves a roleplay conversation to a file

export default
function save(
    this:RpConvo ,
    dataFolder:string,
    userInput?:RpMessage, 
    reply?:RpMessage
    ){

    let gameTime = userInput?.ingameTime ? userInput.ingameTime : [2035, 6, 6, 12, 0];
    
    if(userInput !== undefined){this.messages.push(userInput);};
    if(reply !== undefined)    {this.messages.push(reply);};

    this.irlTimeLast = new Date().getTime();;
    this.gameTimeLast = gameTime;
    const convoFolder = path.join(dataFolder, "conversations", "convoFiles");
    console.log(fs.existsSync(convoFolder));
    const filePath = path.join(convoFolder, this.fileName);
    const fileData = JSON.stringify(this, null, 4);
    fs.writeFileSync(filePath, fileData);
    return fileData;
};