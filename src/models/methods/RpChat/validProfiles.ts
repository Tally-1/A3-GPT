import path from "path";
import fs from "fs";
import RpChat from "../../classes/RpChat";

// checks that both profiles in a roleplay chat exist in the filesystem.

export default
function validProfiles(
    this:RpChat,
    dataFolder:string
    ) {
    const profilesFolder = path.join(dataFolder, "profiles", "files");
    
    const allProfiles = fs.readdirSync(profilesFolder).map((file) => {return file.replace(".json", "")});
    
    if(!allProfiles.includes(this.talkerId)){return false};
    if(!allProfiles.includes(this.listenerId)){return false};


    return true;
};