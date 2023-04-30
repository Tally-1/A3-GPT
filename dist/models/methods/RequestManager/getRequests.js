"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ini = require("ini");
function getRequests() {
    const requests = [];
    const ids = [];
    const A3RequestFile = path_1.default.join(this.iniDbi2Path, "A3-GPT_out.ini");
    const lines = fs_1.default.readFileSync(A3RequestFile, 'utf-8').split("\n");
    let i = 0;
    for (const line of lines) {
        const splitPoint = line.indexOf("=");
        const id = line.slice(0, splitPoint);
        const rawRequest = line.slice(splitPoint + 1).trim();
        if (id !== undefined
            && rawRequest !== undefined
            && rawRequest.length > 0
            && i > 0) {
            ids.push(id);
            const parsedRequest = this.parseStringArr(rawRequest);
            if (parsedRequest !== undefined
                && parsedRequest.length > 0
                && typeof parsedRequest === "object") {
                const [type, data] = parsedRequest;
                const request = [id, type, ...data];
                requests.push(request);
            }
            ;
        }
        ;
        i++;
    }
    ;
    return requests;
}
exports.default = getRequests;
