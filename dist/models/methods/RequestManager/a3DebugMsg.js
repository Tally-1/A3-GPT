"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
function a3DebugMsg(message) {
    RequestManager_1.default.sendA3Request("debug-message", "1", message, this.iniDbi2Path);
}
exports.default = a3DebugMsg;
;
