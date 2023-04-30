"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function validProfiles(dataFolder) {
    const profilesFolder = path_1.default.join(process.cwd(), "data", "profiles", "files");
    const allProfiles = fs_1.default.readdirSync(profilesFolder).map((file) => { return file.replace(".json", ""); });
    if (!allProfiles.includes(this.talkerId)) {
        return false;
    }
    ;
    if (!allProfiles.includes(this.listenerId)) {
        return false;
    }
    ;
    return true;
}
exports.default = validProfiles;
;
