import RequestManager from "../../classes/RequestManager";
import RpProfile from "../../classes/RpProfile";

// Sets a profile to a character and rewrites the profile file with the name of the new character.

export default
function setProfile(
    this:RpProfile,
    profileData:string[],
    requestType:string,
    requestId:string,
    rqManager:RequestManager
    ) {
    const {dataFolder, iniDbi2Path} = rqManager;
    const newId   = this.id;
    this.updateProfile(profileData, dataFolder);

    RequestManager.sendA3Request("response-"+requestType, requestId, newId, iniDbi2Path);
}