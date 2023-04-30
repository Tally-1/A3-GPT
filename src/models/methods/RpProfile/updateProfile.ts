import { blue, green, reset } from "../../../misc/logColors";
import RpProfile from "../../classes/RpProfile";

// Rewrites changes the name used in a profile.

export default
function updateProfile(this:RpProfile, profileData:string[], dataFolder:string){
    const newId   = this.id;

    this.story.replace(this.name, profileData[0]);
    this.story.replace(this.name.split(" ")[0], profileData[0].split(" ")[0]);
    this.name  = profileData[0];
    
    const stored  = this.storeProfile(dataFolder);
    if(stored){console.log(blue+"A3GPT: "+reset+"profile "+green+newId+reset+" updated")}
    else{console.log(blue+"A3GPT: "+reset+"profile "+newId+" not updated")};
    
    return;
};