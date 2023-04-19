"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateProfile(profileData, dataFolder) {
    const newId = this.id;
    this.story.replace(this.name, profileData[0]);
    this.story.replace(this.name.split(" ")[0], profileData[0].split(" ")[0]);
    this.name = profileData[0];
    const stored = this.storeProfile(dataFolder);
    if (stored) {
        console.log("profile " + newId + " updated");
    }
    else {
        console.log("profile " + newId + " not updated");
    }
    ;
    return;
}
exports.default = updateProfile;
;
