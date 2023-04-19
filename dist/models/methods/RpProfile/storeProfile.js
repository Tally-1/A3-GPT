"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function storeProfile(dataFolder) {
    try {
        const profilesFolder = path_1.default.join(dataFolder, "profiles", "files");
        const strProfile = JSON.stringify(this);
        const profileFileName = this.id + ".json";
        const profilePath = path_1.default.join(profilesFolder, profileFileName);
        fs_1.default.writeFileSync(profilePath, strProfile);
    }
    catch (error) {
        console.log("error store profile: " + error);
        return false;
    }
    return true;
}
exports.default = storeProfile;
;
