"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(time);
        }, time);
    });
}
exports.default = sleep;
;
