"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseStringArr(string, count = 1) {
    const lastLetter = string.length - count;
    const newString = string.substring(count, lastLetter);
    const array = JSON.parse(newString);
    return array;
}
exports.default = parseStringArr;
;
