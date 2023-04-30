"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logColors_1 = require("../../../misc/logColors");
const RequestManager_1 = __importDefault(require("../../classes/RequestManager"));
function parseStringArr(string, count = 1) {
    const lastLetter = string.length - count;
    let newString = string.substring(count, lastLetter);
    let array = [];
    try {
        array = JSON.parse(newString);
        return array;
    }
    catch (e) {
        try {
            array = JSON.parse(addMissingQuotes(newString));
            return array;
        }
        catch (e) {
            try {
                array = JSON.parse(addMissingQuotes(toANSI(newString)));
                return array;
            }
            catch (e) {
                try {
                    array = JSON.parse(addMissingQuotes(filterNonAnsi(toANSI(newString))));
                    return array;
                }
                catch (e) {
                    const requestType = newString.substring(2, (newString.indexOf('",')));
                    console.log(`${logColors_1.red}Parsing ${requestType} failed.${logColors_1.reset}`);
                    RequestManager_1.default.logRequestFail(newString, requestType, e);
                    console.log(e);
                    return [];
                }
            }
        }
    }
    ;
}
exports.default = parseStringArr;
;
function addMissingQuotes(str) {
    let newStr = '';
    for (let x = 0; x < str.length; x++) {
        if (str[x] === "," && str[x - 1] !== "]" && str[x - 1] !== "\"") {
            newStr += "\"";
            newStr += ",";
        }
        else {
            newStr += str[x];
        }
    }
    return newStr;
}
;
function filterNonAnsi(string) {
    return string.replace(/[^\x00-\x7F]/g, "");
}
;
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
