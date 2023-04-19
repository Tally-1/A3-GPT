import path from "path";
import fs from "fs";
import RpProfile from "../../classes/RpProfile";



// Stores a roleplay profile in the filesystem

export default
function storeProfile(this:RpProfile, dataFolder:string) {
    try {
      //set paths
      const profilesFolder = path.join(dataFolder, "profiles", "files");
      const strProfile = JSON.stringify(this);
      const profileFileName = this.id + ".json";
      const profilePath = path.join(profilesFolder, profileFileName);
      
      //store profile
      fs.writeFileSync(profilePath, strProfile);
  } catch (error) {
    //@ts-ignore
      console.log("error store profile: " + error);
      return false; 
  }
  
      return true;  
    };