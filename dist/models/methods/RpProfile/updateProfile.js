"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("../../../misc/logColors");
function updateProfile(profileData, dataFolder) {
    const newId = this.id;
    this.story.replace(this.name, profileData[0]);
    this.story.replace(this.name.split(" ")[0], profileData[0].split(" ")[0]);
    this.name = profileData[0];
    const stored = this.storeProfile(dataFolder);
    if (stored) {
        console.log(logColors_1.blue + "A3GPT: " + logColors_1.reset + "profile " + logColors_1.green + newId + logColors_1.reset + " updated");
    }
    else {
        console.log(logColors_1.blue + "A3GPT: " + logColors_1.reset + "profile " + newId + " not updated");
    }
    ;
    return;
}
exports.default = updateProfile;
;
