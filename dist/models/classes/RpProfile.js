"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setProfile_1 = __importDefault(require("../methods/RpProfile/setProfile"));
const updateProfile_1 = __importDefault(require("../methods/RpProfile/updateProfile"));
const storeProfile_1 = __importDefault(require("../methods/RpProfile/storeProfile"));
const assignNewProfile_1 = __importDefault(require("../methods/RpProfile/assignNewProfile"));
const getRpProfileFromId_1 = __importDefault(require("../methods/RpProfile/getRpProfileFromId"));
const generateProfile_1 = __importDefault(require("../methods/RpProfile/generateProfile"));
class RpProfile {
    constructor(baseProfile) {
        this.setProfile = setProfile_1.default;
        this.updateProfile = updateProfile_1.default;
        this.storeProfile = storeProfile_1.default;
        this.id = baseProfile.id;
        this.name = baseProfile.name;
        this.language = baseProfile.language;
        this.ethnicity = baseProfile.ethnicity;
        this.faction = baseProfile.faction;
        this.rank = baseProfile.rank;
        this.role = baseProfile.role;
        this.age = baseProfile.age;
        this.religion = baseProfile.religion;
        this.marital_status = baseProfile.marital_status;
        this.personality = baseProfile.personality;
        this.story = baseProfile.story;
    }
    ;
}
exports.default = RpProfile;
RpProfile.assignNewProfile = assignNewProfile_1.default;
RpProfile.getRpProfileFromId = getRpProfileFromId_1.default;
RpProfile.generateProfile = generateProfile_1.default;
