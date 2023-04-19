import {profile} from "../../misc/interfaces";
import setProfile from "../methods/RpProfile/setProfile";
import updateProfile from "../methods/RpProfile/updateProfile";
import storeProfile from "../methods/RpProfile/storeProfile";
import assignNewProfile from "../methods/RpProfile/assignNewProfile";
import getRpProfileFromId from "../methods/RpProfile/getRpProfileFromId";
import generateProfile from "../methods/RpProfile/generateProfile";


// Defines a roleplay profile of a player / AI
// Generates new profiles using GPT-3
// Stores profiles in the filesystem
// Updates profiles when the character using it has changed
// Assigns new profiles to characters when they are created
// Assigns old profiles to characters when available.

export default
class RpProfile {
id: string;
name: string;
language: string[];
ethnicity: string;
faction: string;
rank: string[];
role: string;
age: number;
marital_status: string;
personality: string;
story: string;

constructor(baseProfile: profile) {
    // const baseProfile = JSON.parse(jsonProfile) as profile;
    this.id = baseProfile.id;
    this.name = baseProfile.name;
    this.language = baseProfile.language;
    this.ethnicity = baseProfile.ethnicity;
    this.faction = baseProfile.faction;
    this.rank = baseProfile.rank;
    this.role = baseProfile.role;
    this.age = baseProfile.age;
    this.marital_status = baseProfile.marital_status;
    this.personality = baseProfile.personality;
    this.story = baseProfile.story;

};

setProfile    = setProfile;
updateProfile = updateProfile;
storeProfile  = storeProfile;

static assignNewProfile   = assignNewProfile;
static getRpProfileFromId = getRpProfileFromId;
static generateProfile    = generateProfile;

}