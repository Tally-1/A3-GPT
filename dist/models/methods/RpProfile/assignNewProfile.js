"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const RpProfile_1 = __importDefault(require("../../classes/RpProfile"));
async function assignNewProfile(request, manager) {
    const [requestId, type, profileData, profilesInUse,] = request;
    const profileType = profileData[6].split("-")[0];
    const profilesFolder = path_1.default.join(manager.dataFolder, "profiles", "files");
    const profilesList = fs_1.default.readdirSync(profilesFolder);
    const ids = profilesList.map(el => { return el.split(".")[0]; });
    const availableIds = ids.filter((id) => (!profilesInUse.includes(id) && id.startsWith(profileType)));
    if (availableIds.length > 0) {
        useStoredProfile(availableIds, profileData, type, requestId, manager);
        return;
    }
    ;
    if (manager.profileProcessing) {
        if (!manager.profileRequests.includes(request))
            manager.profileRequests.push(request);
        return;
    }
    const profile = await useGeneratedProfile(profileData, type, requestId, manager);
    return profile === null || profile === void 0 ? void 0 : profile.name;
}
exports.default = assignNewProfile;
;
async function useGeneratedProfile(profileData, type, requestId, manager) {
    manager.profileProcessing = true;
    const stringProfile = await RpProfile_1.default.generateProfile(profileData, true, manager.apiKey);
    manager.profileProcessing = false;
    if (stringProfile.includes("error")) {
        console.log("profile Error: " + stringProfile);
        return;
    }
    ;
    if (stringProfile === undefined) {
        console.log("no profile generated");
        return;
    }
    ;
    const rpPrfl = new RpProfile_1.default(JSON.parse(stringProfile));
    console.log("profile " + rpPrfl.id + " built.");
    rpPrfl.setProfile(profileData, type, requestId, manager);
    return rpPrfl;
}
;
function useStoredProfile(availableIds, profileData, type, requestId, manager) {
    const profileId = availableIds[0];
    const profilesFolder = path_1.default.join(manager.dataFolder, "profiles", "files");
    const profilePath = path_1.default.join(profilesFolder, profileId + ".json");
    const pr0file = require(profilePath);
    new RpProfile_1.default(pr0file).setProfile(profileData, type, requestId, manager);
}
;
