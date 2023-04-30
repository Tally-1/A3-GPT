import path from "path";
import fs from "fs";
import { profileRequestData, profile } from "../../../misc/interfaces";
import RpProfile from "../../classes/RpProfile";
import RequestManager from "../../classes/RequestManager";
import sleep from "../../../misc/sleep";
import { blue, cyan, reset } from "../../../misc/logColors";

const requestFrequency = 17000; // 15 seconds between requests

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

    const profileType    = profileData[6].split("-")[0];
    const profilesFolder = path.join(manager.dataFolder, "profiles", "files");
    const profilesList   = fs.readdirSync(profilesFolder);

    

    const ids            = profilesList.map(el => {
      return el.split(".json")[0]
    });

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
    
    try {

      const profile = await useGeneratedProfile(
        profileData, 
        type, 
        requestId,
        manager
        );
  
        return profile?.name;

    }
    // Usually this will fail due to too many requests being sent at the same time
    // Here I reset the profileProcessing flag and wait 20 seconds before trying again
    catch(error){
      manager.profileProcessing = false;
      manager.prevProfileRequestTime = Date.now() + requestFrequency;
      console.log('\x1b[31m'+"Error while generating profile: " + error + '\x1b[0m');
      manager.globalHint("Could not generate profile for " + profileData[0] + "("+profileData[4]+")");
      return;
    }
   
    
  };

  async function useGeneratedProfile(
    profileData:string[],
    type:string,
    requestId:string,
    manager:RequestManager
   ){

    //wait for previous profile request to finish
    await initProfileRequest(manager, profileData[0]);

    //user feedback
    console.log("Generating profile for " + profileData[0] + "("+profileData[4]+")");
    manager.globalHint("Generating profile for " + profileData[0] + "("+profileData[4]+")");

    //generate profile and update the profile manager
    manager.profileProcessing = true;
    const start = Date.now();
    manager.prevProfileRequestTime = Date.now();
    const stringProfile = await RpProfile.generateProfile(profileData, true, manager.apiKey);
    manager.profileProcessing      = false;
    
    
    
    
    if(stringProfile.includes("error")){console.log("profile Error: " +stringProfile); return;};
    if(stringProfile === undefined){console.log("no profile generated"); return;};
    console.log('\x1b[32m'+"------------------------"+'\x1b[0m');
    console.log('\x1b[32m'+"Profile generated:"+'\x1b[0m');
    console.log(stringProfile);
    console.log('\x1b[32m'+"------------------------"+'\x1b[0m');

    const rpPrfl = new RpProfile(JSON.parse(stringProfile));
    rpPrfl.setProfile(profileData, type, requestId, manager);
    
    const time = Math.round((Date.now() - start)/1000);
    manager.globalHint(profileData[0]+"'s profile generated in "+time+" seconds...");
    
    return rpPrfl;
  };



async function initProfileRequest(mngr:RequestManager, profileName:string) {
  if(mngr.profileProcessing === true){
    console.log('');
    console.log('\x1b[31m '+"Double profile request detected" + '\x1b[0m');
  };

  
  while (mngr.profileProcessing === true) {
    await sleep(1000);
  };

  if(Date.now() - mngr.prevProfileRequestTime < requestFrequency){ 
    console.log('\x1b[33m'+"Waiting to make sure there is "+(requestFrequency/1000)+" seconds between profile requests"+'\x1b[0m');
    await sleep(3000);
    mngr.globalHint("waiting to generate "+profileName+"'s profile...");

  };

  while ( Date.now() - mngr.prevProfileRequestTime < requestFrequency) {
    await sleep(1000);

  }
  return;
}



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
    if(fs.existsSync(profilePath) === false){ 
      console.log(blue+"A3GPT: "+reset+"Profile not found: " + profilePath);
      return;
    };
    const pr0file = require(profilePath) as profile;
  
    // updates the profile and returns the profileId to Arma 3
    new RpProfile(pr0file).setProfile(profileData, type, requestId, manager);
  };