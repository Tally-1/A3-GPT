"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
function setProfile(profileData, requestType, requestId, rqManager) {
    const { dataFolder, iniDbi2Path } = rqManager;
    const newId = this.id;
    this.updateProfile(profileData, dataFolder);
    RequestManager_1.default.sendA3Request("response-" + requestType, requestId, newId, iniDbi2Path);
}
exports.default = setProfile;
