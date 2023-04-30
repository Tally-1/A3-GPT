"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const RpProfile_1 = __importDefault(require("../../classes/RpProfile"));
const sleep_1 = __importDefault(require("../../../misc/sleep"));
const logColors_1 = require("../../../misc/logColors");
const requestFrequency = 17000;
async function assignNewProfile(request, manager) {
    const [requestId, type, profileData, profilesInUse,] = request;
    const profileType = profileData[6].split("-")[0];
    const profilesFolder = path_1.default.join(manager.dataFolder, "profiles", "files");
    const profilesList = fs_1.default.readdirSync(profilesFolder);
    const ids = profilesList.map(el => {
        return el.split(".json")[0];
    });
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
    try {
        const profile = await useGeneratedProfile(profileData, type, requestId, manager);
        return profile === null || profile === void 0 ? void 0 : profile.name;
    }
    catch (error) {
        manager.profileProcessing = false;
        manager.prevProfileRequestTime = Date.now() + requestFrequency;
        console.log('\x1b[31m' + "Error while generating profile: " + error + '\x1b[0m');
        manager.globalHint("Could not generate profile for " + profileData[0] + "(" + profileData[4] + ")");
        return;
    }
}
exports.default = assignNewProfile;
;
async function useGeneratedProfile(profileData, type, requestId, manager) {
    await initProfileRequest(manager, profileData[0]);
    console.log("Generating profile for " + profileData[0] + "(" + profileData[4] + ")");
    manager.globalHint("Generating profile for " + profileData[0] + "(" + profileData[4] + ")");
    manager.profileProcessing = true;
    const start = Date.now();
    manager.prevProfileRequestTime = Date.now();
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
    console.log('\x1b[32m' + "------------------------" + '\x1b[0m');
    console.log('\x1b[32m' + "Profile generated:" + '\x1b[0m');
    console.log(stringProfile);
    console.log('\x1b[32m' + "------------------------" + '\x1b[0m');
    const rpPrfl = new RpProfile_1.default(JSON.parse(stringProfile));
    rpPrfl.setProfile(profileData, type, requestId, manager);
    const time = Math.round((Date.now() - start) / 1000);
    manager.globalHint(profileData[0] + "'s profile generated in " + time + " seconds...");
    return rpPrfl;
}
;
async function initProfileRequest(mngr, profileName) {
    if (mngr.profileProcessing === true) {
        console.log('');
        console.log('\x1b[31m ' + "Double profile request detected" + '\x1b[0m');
    }
    ;
    while (mngr.profileProcessing === true) {
        await (0, sleep_1.default)(1000);
    }
    ;
    if (Date.now() - mngr.prevProfileRequestTime < requestFrequency) {
        console.log('\x1b[33m' + "Waiting to make sure there is " + (requestFrequency / 1000) + " seconds between profile requests" + '\x1b[0m');
        await (0, sleep_1.default)(3000);
        mngr.globalHint("waiting to generate " + profileName + "'s profile...");
    }
    ;
    while (Date.now() - mngr.prevProfileRequestTime < requestFrequency) {
        await (0, sleep_1.default)(1000);
    }
    return;
}
function useStoredProfile(availableIds, profileData, type, requestId, manager) {
    const profileId = availableIds[0];
    const profilesFolder = path_1.default.join(manager.dataFolder, "profiles", "files");
    const profilePath = path_1.default.join(profilesFolder, profileId + ".json");
    if (fs_1.default.existsSync(profilePath) === false) {
        console.log(logColors_1.blue + "A3GPT: " + logColors_1.reset + "Profile not found: " + profilePath);
        return;
    }
    ;
    const pr0file = require(profilePath);
    new RpProfile_1.default(pr0file).setProfile(profileData, type, requestId, manager);
}
;
