"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getRpProfileFromId(profileId, dataFolder) {
    const profilesFolder = path_1.default.join(dataFolder, "profiles", "files");
    const profileList = fs_1.default.readdirSync(profilesFolder);
    const profileIndex = profileList.map(file => file.split(".")[0]).indexOf(profileId);
    const profile = require(path_1.default.join(profilesFolder, profileList[profileIndex]));
    return profile;
}
exports.default = getRpProfileFromId;
;
