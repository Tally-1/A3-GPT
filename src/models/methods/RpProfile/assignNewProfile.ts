import path from "path";
import fs from "fs";
import { profileRequestData, profile } from "../../../misc/interfaces";
import RpProfile from "../../classes/RpProfile";
import RequestManager from "../../classes/RequestManager";


// Assigns profiles to ingame characters based on characteristics retrived ingame.
// If a profile with the same characteristics is already stored in the filesystem, it is used.
// If not, a new profile is generated and stored.

export default
async function assignNewProfile(
  request:profileRequestData,
  manager:RequestManager
  ) {
    const [
        requestId, 
        type, 
        profileData, 
        profilesInUse,        
    ] = request;
  
    const profileType  = profileData[6].split("-")[0];
    const profilesFolder = path.join(manager.dataFolder, "profiles", "files");
    const profilesList  = fs.readdirSync(profilesFolder);
    const ids           = profilesList.map(el => {return el.split(".")[0]});
    const availableIds  = ids.filter((id) => (!profilesInUse.includes(id) && id.startsWith(profileType)));
  
    if(availableIds.length > 0){
        useStoredProfile(availableIds, profileData, type, requestId, manager);
        return;
    };
    
    // Push request to queue if a profile is already being generated
    if(manager.profileProcessing){
      if(!manager.profileRequests.includes(request)) manager.profileRequests.push(request);
      return;
    }
    
   const profile = await useGeneratedProfile(
      profileData, 
      type, 
      requestId,
      manager
      );

      return profile?.name;
    
  };

  async function useGeneratedProfile(
    profileData:string[],
    type:string,
    requestId:string,
    manager:RequestManager
   ){
    
    manager.profileProcessing = true;
    const stringProfile = await RpProfile.generateProfile(profileData, true, manager.apiKey);
    manager.profileProcessing = false;
    
    if(stringProfile.includes("error")){console.log("profile Error: " +stringProfile); return;};
    if(stringProfile === undefined){console.log("no profile generated"); return;};
  
    const rpPrfl = new RpProfile(JSON.parse(stringProfile));
    
    console.log("profile "+rpPrfl.id+" built.");
    rpPrfl.setProfile(profileData, type, requestId, manager);

    return rpPrfl;
  };




 function useStoredProfile(
    availableIds:string[],
    profileData:string[],
    type:string,
    requestId:string,
    manager:RequestManager
    ) {
        
    const profileId = availableIds[0];
    const profilesFolder = path.join(manager.dataFolder, "profiles", "files");
    const profilePath = path.join(profilesFolder, profileId+".json");
    const pr0file = require(profilePath) as profile;
  
    // updates the profile and returns the profileId to Arma 3
    new RpProfile(pr0file).setProfile(profileData, type, requestId, manager);
  };