import path from "path";
import fs from "fs";

// Loads a roleplay profile from the filesystem

export default
function getRpProfileFromId(profileId:string, dataFolder:string){

    const profilesFolder = path.join(dataFolder, "profiles", "files");
    const profileList    = fs.readdirSync(profilesFolder);
    const profileIndex   =  profileList.map(file => file.split(".")[0]).indexOf(profileId);
    
    // const profilesList     = require(profilesFile) as profileList;
  
    const profile   = require(path.join(profilesFolder, profileList[profileIndex]));
    return profile;
  };