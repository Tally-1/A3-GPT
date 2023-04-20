"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
function globalHint(text, startupHint = false) {
    const id = -1 + "";
    let type = "hint-global";
    if (startupHint)
        type = "hint-global-startup";
    RequestManager_1.default.sendA3Request(type, id, text, this.iniDbi2Path);
}
exports.default = globalHint;
;
