"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ini = require("ini");
function getRequests() {
    try {
        const A3RequestFile = path_1.default.join(this.iniDbi2Path, "A3-GPT_out.ini");
        const content = fs_1.default.readFileSync(A3RequestFile, 'utf-8');
        const requestList = (ini.parse(content))['A3-GPT_out'];
        const requestIds = Object.keys(requestList);
        const requests = [];
        for (const id of requestIds) {
            const requestString = requestList[id];
            if (requestString !== undefined) {
                let rqstr = toANSI(requestString);
                let type;
                let data;
                try {
                    [type, data] = this.parseStringArr(rqstr);
                }
                catch (e) {
                    rqstr = rqstr.replace(/""/g, '"').replace(/""/g, '"').replace(/""/g, '"');
                    [type, data] = this.parseStringArr(rqstr);
                }
                const request = [id, type, ...data];
                requests.push(request);
            }
        }
        ;
        return requests;
    }
    catch (error) {
        console.log("error get requests");
        return [];
    }
}
exports.default = getRequests;
function toANSI(string) {
    const nonAnsiMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ñ': 'n',
        'ł': 'l'
    };
    return string.replace(/[^\x00-\x7F]/g, function (match) {
        return nonAnsiMap[match] || '';
    });
}
;
