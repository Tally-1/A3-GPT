"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sendA3Request_1 = __importDefault(require("./sendA3Request"));
function sendVersion() {
    const id = -1 + "";
    const type = "dco-api-version";
    const version = require(path_1.default.join(__dirname, "../../../../package.json")).version;
    (0, sendA3Request_1.default)(type, id, version, this.iniDbi2Path);
}
exports.default = sendVersion;
;
